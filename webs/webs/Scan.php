<?php

$total = '';

for ($num = 1; $num <= 36; $num++) {
    $total .= file_get_contents(__DIR__ . '/scraping/textoOcr/pagina_' . $num . '.txt') . "\n";
}

$lines   = explode("\n", $total);
$artigos = [];
$artigo  = '';
$find    = false;

foreach ($lines as $index => $line) {
    $line = trim($line);

    if (strlen($line) === 0) {
        continue;
    }

    if (preg_match("/(^Art\..\d)/", $line)) {
        $find    = true;
    }

    if (preg_match("/(\w\-$)/", $line)) {
        $line = rtrim($line, '-');
    }

    if ($find) {
        $artigo .= $line;
    }

    if ($find and $line[strlen($line) - 1] == '.') {
        $find = false;

        $artigos[] = $artigo;
        $artigo    = "";
    }
}

file_put_contents(__DIR__ . '/total_scan.txt', $total);
file_put_contents(__DIR__ . '/total_scan.json', json_encode($artigos));
