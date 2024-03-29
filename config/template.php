<?php

return [
    'sideBar' => [
        'items' => [
            [
                'nodeText' => 'Dashboard',
                'iconCss' => 'fa-solid fa-gauge-high',
                'url' =>  '/admin/dashboard',
                'requireAuth' => true,
            ],
            [
                'nodeText' => 'Ateliers',
                'iconCss' => 'fa-solid fa-paintbrush',
                'permissions' => null,
                'conceptUrl' => 'atelier',
                'url' => '/admin/atelier'
            ],
            [
                'nodeText' => 'Outils',
                'iconCss' => 'fa fa-tools',
                'requireAuth' => true,
                'nodeChild' => [
                    [
                        'nodeText' => 'Gestion Utilisateurs',
                        'iconCss' => 'fa fa-users',
                        //'conceptUrl' => 'user',
                        'permissions' => [App\Enums\Permissions\UserPermissionType::MANAGE->value],
                        'nodeChild' => [
                            [
                                'nodeText' => 'Utilisateurs',
                                //'iconCss' => 'fa fa-users',
                                'url' => '/admin/user',
                                'permissions' => App\Enums\Permissions\UserPermissionType::MANAGE->value
                            ],
                            [
                                'nodeText' => 'Ajouter utilisateur',
                                //'iconCss' => 'fa fa-plus',
                                'url' =>  '/admin/user/create',
                                'permissions' => App\Enums\Permissions\UserPermissionType::CREATE->value
                            ],
                        ]
                    ],
                    [
                        'nodeText' => 'Gestion des roles',
                        'iconCss' => 'fas fa-user-tag',
                        'permissions' => [App\Enums\Permissions\RolePermissionType::MANAGE->value],
                        'conceptUrl' => 'role',
                        'nodeChild' => [
                            [
                                'nodeText' => 'Roles',
                                //'iconCss' => 'fas fa-user-tag',
                                'url' =>  '/admin/role',
                                'permissions' => App\Enums\Permissions\RolePermissionType::MANAGE->value
                            ],
                            [
                                'nodeText' => 'Ajouter un role',
                                //'iconCss' => 'fas fa-user-tag',
                                'url' => '/admin/role/create',
                                'permissions' => App\Enums\Permissions\RolePermissionType::CREATE->value
                            ],
                        ]
                    ],
                ]
            ]
        ]
    ],
    'sideBarFront'=> [
        'items' => [],
    ],
    'userMenu' => [
        'items' => [

        ]
    ]
];
