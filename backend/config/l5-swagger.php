<?php

return [
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'L5 Swagger UI',
            ],

            'routes' => [
                /*
                 * Route for accessing api documentation interface
                 */
                'api' => 'api/documentation',
                /*
                 * Route for accessing parsed swagger annotations.
                 */
                'docs' => 'docs',
            ],

            'paths' => [
                /*
                 * Edit to include full URL in ui for assets
                 */
                'use_absolute_path' => env('L5_SWAGGER_USE_ABSOLUTE_PATH', false),

                /*
                 * Path to the swagger annotation storage directory.
                 */
                'docs' => storage_path('api-docs'),

                /*
                 * Path to the generated JSON documentation file.
                 */
                'json' => storage_path('api-docs/api-docs.json'),

                /*
                 * File to overwrite the generated documentation output.
                 */
                'annotations' => base_path('app'),

                /*
                 * Absolute path to directory where to export views
                 */
                'views' => base_path('resources/views/vendor/l5-swagger'),

                'base' => env('L5_SWAGGER_BASE_PATH', null),

                'swagger_ui_assets_path' => env('L5_SWAGGER_UI_ASSETS_PATH', 'vendor/swagger-api/swagger-ui/dist/'),

                /*
                 * Directories and files that should be excluded from scanning
                 */
                'excludes' => [],
            ],

            'securityDefinitions' => [
                'securitySchemes' => [
                    'bearerAuth' => [
                        'type' => 'http',
                        'scheme' => 'bearer',
                        'bearerFormat' => 'JWT',
                    ],
                ],
                'security' => [
                    [
                        'bearerAuth' => [],
                    ],
                ],
            ],

            'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),
            'generate_yaml_copy' => env('L5_SWAGGER_GENERATE_YAML_COPY', false),
            'proxy' => false,
            'additional_config_url' => null,
            'operations_sort' => env('L5_SWAGGER_OPERATIONS_SORT', null),
            'validator_url' => null,
        ],
    ],

    'defaults' => [
        'use_base_url' => env('L5_SWAGGER_BASE_PATH', false),

        'base' => [
            'api' => env('L5_SWAGGER_BASE_PATH', null),
            'version' => env('L5_SWAGGER_VERSION', '1.0.0'),
            'url' => env('L5_SWAGGER_API_HOST', 'http://localhost:8000'),
            'protocols' => [],
            'host' => env('L5_SWAGGER_HOST', 'localhost'),
        ],

        'info' => [
            'title' => env('L5_SWAGGER_INFO_TITLE', 'Swagger API'),
            'description' => env('L5_SWAGGER_INFO_DESCRIPTION', 'Swagger API description'),
            'termsOfService' => '',
            'contact' => [
                'email' => env('L5_SWAGGER_CONTACT_EMAIL', 'support@example.com'),
            ],
            'license' => [
                'name' => 'Apache 2.0',
                'url' => 'http://www.apache.org/licenses/LICENSE-2.0.html',
            ],
        ],

        'tags' => [],
        'paths' => [],
    ],
];