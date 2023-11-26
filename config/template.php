<?php

return [
    'sideBar' => [
        'items' => [
            [
                'nodeText' => 'Dashboard',
                'iconCss' => 'fa-solid fa-gauge-high',
                'navigateUrl' =>  '/admin/dashboard',
            ],
            [
                'nodeText' => 'Outils',
                'iconCss' => 'fa fa-tools',
                'nodeChild' => [
                    [
                        'nodeText' => 'Gestion Utilisateurs',
                        'iconCss' => 'fa fa-users',
                        'conceptUrl' => 'user',
                        'permissions' => ['gestion utilisateur'],
                        'nodeChild' => [
                            [
                                'nodeText' => 'Utilisateurs',
                                //'iconCss' => 'fa fa-users',
                                'navigateUrl' => '/admin/user',
                                'permissions' => 'gestion utilisateur'
                            ],
                            [
                                'nodeText' => 'Ajouter utilisateur',
                                //'iconCss' => 'fa fa-plus',
                                'navigateUrl' =>  '/admin/user/create',
                                'permissions' => 'utilisateur ajouter'
                            ],
                        ]
                    ],
                    [
                        'nodeText' => 'Gestion des roles',
                        'iconCss' => 'fas fa-user-tag',
                        'permissions' => ['gestion role'],
                        'conceptUrl' => 'role',
                        'nodeChild' => [
                            [
                                'nodeText' => 'Roles',
                                //'iconCss' => 'fas fa-user-tag',
                                'navigateUrl' =>  '/admin/role',
                                'permissions' => 'gestion role'
                            ],
                            [
                                'nodeText' => 'Ajouter un role',
                                //'iconCss' => 'fas fa-user-tag',
                                'navigateUrl' => '/admin/role/create',
                                'permissions' => 'role ajouter'
                            ],
                        ]
                    ],
                ]
            ]

        ]
    ]
];
