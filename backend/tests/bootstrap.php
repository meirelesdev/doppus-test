<?php

use Dotenv\Dotenv;

if (file_exists(__DIR__ . '/../.env.testing')) {
    Dotenv::createImmutable(__DIR__ . '/../', '.env.testing')->load();
}