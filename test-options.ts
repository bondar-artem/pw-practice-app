import {test as base} from '@playwright/test'

export type TestOptions = {
    globalsQaURL: string
}

export const test  = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}]
})