import {expect, Locator, Page} from "@playwright/test";

export class TemperaturePage {

  private readonly temperatureLocator: Locator;
  private readonly dragger: Locator;
  private readonly slider: Locator;

  constructor(private readonly page: Page) {
    this.temperatureLocator = this.page.locator('.slider-value-container .value.temperature');
    this.dragger = this.page.locator('ngx-temperature-dragger').first();
    this.slider = this.page.locator('ngx-temperature-dragger svg ').nth(0);
  }

  async setTemperature(temperature: number) {
    await this.slider.waitFor();
    const boundingBox = await this.slider.boundingBox();
    if (!boundingBox) throw new Error('Slider SVG not found');
    await this.validateTemperature(temperature)

    // TODO Check different value
    const angleMin = 131;
    const angleMax = 409;
    const angleRange = angleMax - angleMin;
    const { minTemp, maxTemp } = await this.getTemperatureBoundaries();

    const angle = angleMin + ((temperature - minTemp) / (maxTemp - minTemp)) * angleRange;
    const angleInRadians = (angle * Math.PI) / 180;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    // Adjust radius for more precise positioning
    const radius = Math.min(boundingBox.width, boundingBox.height) * 0.45;

    const clickX = centerX + radius * Math.cos(angleInRadians);
    const clickY = centerY + radius * Math.sin(angleInRadians);

    await this.page.mouse.click(clickX, clickY);
  }

  async checkTemperature(temperature: number) {
    await expect(async () => {
      await expect(this.temperatureLocator).toContainText(temperature.toString());
    }).toPass();
  }

  private async validateTemperature(value: number) {
    const { minTemp, maxTemp } = await this.getTemperatureBoundaries();

    if (!Number.isInteger(value)) {
      throw new Error(`Temperature must be an integer (e.g. 18), but received: ${value}`);
    }

    if (value < minTemp || value > maxTemp) {
      throw new Error(`Temperature must be between ${minTemp} and ${maxTemp}, but received: ${value}`);
    }
  }

  private async getTemperatureBoundaries(): Promise<{minTemp: number, maxTemp: number}> {
    const minTemp = Number(await this.dragger.getAttribute('ng-reflect-min'));
    const maxTemp = Number(await this.dragger.getAttribute('ng-reflect-max'));
    return { minTemp, maxTemp };
  }

}
