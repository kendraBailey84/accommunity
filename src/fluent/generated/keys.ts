import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    amoila_categories_module: {
                        table: 'sys_app_module'
                        id: 'dc4a086806d24b9d85ac040c9dd36c9e'
                    }
                    amoila_connect_category: {
                        table: 'sys_app_category'
                        id: '6626665c62844dfb93cc9c145600dae2'
                    }
                    amoila_connect_menu: {
                        table: 'sys_app_application'
                        id: '0f595cb28ceb4cc8964a4300a6cb3101'
                    }
                    amoila_dashboard_module: {
                        table: 'sys_app_module'
                        id: 'f48ea6900be94a08859c0ead0c8694c7'
                    }
                    amoila_faqs_module: {
                        table: 'sys_app_module'
                        id: '21ff2c53969546888bcc0b8fe745e2ae'
                    }
                    amoila_kb_articles_module: {
                        table: 'sys_app_module'
                        id: '28572d6045734125911d686c2fb78771'
                    }
                    amoila_members_module: {
                        table: 'sys_app_module'
                        id: 'c36c1953a33a487e8d637fe707d909d1'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'aa64bbc952a4434e94af17ba38fbe407'
                    }
                    cat_community: {
                        table: 'x_snc_amoila_conne_category'
                        id: 'f569f0586bd4426a848544308a643f18'
                    }
                    cat_getting_started: {
                        table: 'x_snc_amoila_conne_category'
                        id: 'f7a4d94dce1d423093e23194375bc038'
                    }
                    cat_nutrition_recovery: {
                        table: 'x_snc_amoila_conne_category'
                        id: '106cef63c1a34d77afa16118f26478ff'
                    }
                    cat_programs_workouts: {
                        table: 'x_snc_amoila_conne_category'
                        id: 'bd8d4ab0eb8345d5a84363e813c738ad'
                    }
                    cat_technical_support: {
                        table: 'x_snc_amoila_conne_category'
                        id: '1efb4744eec440d3af7e85f65873f827'
                    }
                    faq_645_access: {
                        table: 'x_snc_amoila_conne_faq'
                        id: '6dad7d42790e4273be31eb4f25407144'
                    }
                    faq_account_creation: {
                        table: 'x_snc_amoila_conne_faq'
                        id: '5d80f69913804414a0a5e8ad939dd37f'
                    }
                    faq_blueprints: {
                        table: 'x_snc_amoila_conne_faq'
                        id: '5d5d3d734cd94ead81dbe5a70bb8c78b'
                    }
                    faq_cancellation: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'febb74b61d534b7e8b08be3d8255abce'
                    }
                    faq_community: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'b6269271568c4a339d5e3e0b2bda99fb'
                    }
                    faq_equipment: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'a1326824aed4492a8341d14d1d3589ba'
                    }
                    faq_free_workouts: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'bfa44363b56f4e05a439129a5735fd2c'
                    }
                    faq_password_reset: {
                        table: 'x_snc_amoila_conne_faq'
                        id: '36b092cae2fa498d94ec569047cf775a'
                    }
                    faq_programs: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'aa3c38f17fd94cfabf5e62bb448a424c'
                    }
                    faq_support_contact: {
                        table: 'x_snc_amoila_conne_faq'
                        id: 'd55ed00c107e4273b8b5f8b3345edb87'
                    }
                    kb_645_overview: {
                        table: 'x_snc_amoila_conne_kb_article'
                        id: 'b7abebf5517947d0b725b74e487448b8'
                    }
                    kb_community_rules: {
                        table: 'x_snc_amoila_conne_kb_article'
                        id: 'e25aa28cdc704790b571c4f0772308b7'
                    }
                    kb_recovery_guidelines: {
                        table: 'x_snc_amoila_conne_kb_article'
                        id: 'bfc56f2fe6e843058b5df331acc05a9f'
                    }
                    kb_warmup_blueprint: {
                        table: 'x_snc_amoila_conne_kb_article'
                        id: '74ff8b89eee14cfab899733e908000b2'
                    }
                    kb_welcome_guide: {
                        table: 'x_snc_amoila_conne_kb_article'
                        id: '3974436ca8f141768a6f7a7ca285fd63'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8057534a0b91445e9274d08c0e6d5d21'
                    }
                }
                composite: [
                    {
                        table: 'ua_table_licensing_config'
                        id: '01089c4de7a14606a7ff4bd9e83067cf'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02b04d4039a24ef28709bac62dcbcfd1'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            value: '645'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '04ee4abb05a84195a8fde6ef8ebd8992'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '07f332f5e9594efbb2fc61fa58f31fa8'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'content'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a385b99f2b6422eb1e8c54368c2386e'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'featured'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '0cc04f88c9c14b82a41f8261ebd49378'
                        key: {
                            name: 'x_snc_amoila_conne.admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d9ad427e0bc485bb45a30cb848eabec'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'view_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0ddc86e1c8e44e4b96127a5b58e9910c'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            value: 'none'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e4cd79f3ea346df99cdc7f2ff1aabfd'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0fea53a61ff549c795349e08b85de6f0'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            value: 'general_fitness'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '11424fd881254358aa266a36d89538c2'
                        key: {
                            category: 'x_snc_amoila_conne_kb_article'
                            prefix: 'KB'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '121686c66dc14655b5d1e9c75d75a15f'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                            value: 'beginner'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '149996e07ce540c29bab2ae05239ba2f'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '2360111ff7544e87b944043428a55072'
                        key: {
                            category: 'x_snc_amoila_conne_member'
                            prefix: 'MBR'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '25bad88feb7642668cd1ef252ac855e1'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '27ca44b3189b4f3b9524bee1a05cc49c'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28137bf842044a5ab0e1def9a6184a00'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'icon'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d1a301b80d74c8faeb696fbeeb846a8'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'display_order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '31f8bdeaf69048678240b149fe08dc7a'
                        key: {
                            name: 'x_snc_amoila_conne.member'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33595e788b80402b86b67112e27d8951'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3435e17b751c46dead3c5957e2baca2c'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3473e3f4d13f4f8fa80aa412e2c40d59'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '37854a3f317a4e6e86d077d44451e3d6'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'content'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37d8e93093464e519cb1aecfe9da4482'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'helpful_no'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '396ed629cfc64e9c914f63ad0fa71f42'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'join_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c3c0687a0864f50ad81f697bae4139b'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'slug'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3df0b21eacec4c62a3e96957940a8e9b'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3eb7028d12fd4b69820489e372a487aa'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'view_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3ed512c9c7a14a799fdb253c4dcbd16f'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'profile_image'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3fd385dbf84a4e7f942d2a868aa84a90'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'featured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '40dbfe150339402b8e1601e8ed53b975'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'helpful_no'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4346947671d447969ffbf655efe58e6e'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'helpful_yes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '436191ed5c0d4926aafebe9fe1d88c2d'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '44faa9ff59904ac3b2a2dc986e0dff12'
                        key: {
                            category: 'x_snc_amoila_conne_category'
                            prefix: 'CAT'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '45cfea3baf184ca7995e1596d083c715'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            value: 'athletic_performance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '468aecf1e9c44d96b6fb53e92c27def0'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'helpful_no'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4822d23c3fc3476aa211fa9d844c5ece'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'display_order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '489649acb6384cc8b25142c2f15110f4'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '49e81cf6551d4e398663927c030b2c9c'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            value: 'improve_mobility'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4afe34f5808a48a3977ebe406c60b8e6'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                            value: 'advanced'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d6c1e529cc345dc9fc3c705a1176bfa'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d8159eaacfa4e99864e4a3d4fc8eac7'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ebd8c3ddbe14698853b2dcedf80e95f'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'helpful_no'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50efe8d1b1ef413ebd239e66b933cc57'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '560714a1243c4c3187840f8167ba8614'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '56c84c1a1a59440c9d05b43263a1625d'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c6f9b7d103049269beecbef420a8652'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5ca498027ae9434e9b5dcc20cb9a60f4'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5d10c46e4d9241fd924530b8015522c3'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'publish_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '606635901f6049a5865d53dca3a9e676'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'total_xp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63dba87e99fa4f7e866bb330ed4413be'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'profile_image'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66893d34690d4232b3eee102d7a4a7b9'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'featured_image'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '677fea3649e24aeaa6595fba43327de3'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7086b4ffeea44040aa275b6ef0446aae'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '721b296105a24177b186aa2b74eaf6b2'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'longest_streak'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '723cd5f104d042f29eb5fe8ac937270a'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'answer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '731cf25900c04510a37bce4c207ee41d'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'featured_image'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '759551ebe0624c9c993326f4775d7a66'
                        key: {
                            role: {
                                id: '801bb86aae8248d1a2ec0124c182b253'
                                key: {
                                    name: 'x_snc_amoila_conne.coach'
                                }
                            }
                            contains: {
                                id: '31f8bdeaf69048678240b149fe08dc7a'
                                key: {
                                    name: 'x_snc_amoila_conne.member'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7629dfcf6f934fa3b88c1eb6f586248a'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'helpful_yes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '763d956e3b74469dbb816e681636abe8'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'display_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7819856c9d8b4c9d8cf4a68d89d4d46e'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'view_count'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7da5aa81160d49448fd1aa04cd25d4b9'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7f64d51f085c431d8534f2d66d646cd4'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '801bb86aae8248d1a2ec0124c182b253'
                        key: {
                            name: 'x_snc_amoila_conne.coach'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8454e3bee09d4d8bbd1488ecd345e777'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            value: 'the_work'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '87bd334699dc44479c9bd78767c471d6'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '87ecabc7af604a589502672b2632cce0'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87fb0ef2461b45b9ab2b8af4d7bd85d6'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'current_streak'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8fa20a13f0814fdb812dfccac9018df6'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '8fbb90290a7b4a49ba2b62bc432578e3'
                        key: {
                            category: 'x_snc_amoila_conne_faq'
                            prefix: 'FAQ'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '90837049c3ee40e4bafd0a04d0a44a73'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'slug'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '909fbcb08d3c4176bd0647eece5926cb'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'bio'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '918989d7b9ed4bee9834eac9f8386652'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'display_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9391de46423947e3bc0724cb0c34c7da'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'current_streak'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9394ed7cc0af414a95080855f0efedb1'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93f2c0bb794442a38c1899155346afa5'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '965da6237ec444c39f410bc10353c35e'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9c37b70538564491afbbc1683e5d4f05'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9c634d97259a4393b95d5ec43b0a9899'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d6689ea8001425a9d06d2ddd4ef3b4d'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'publish_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e8d4d7efeb943899998992a51455432'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a02a7c530f64477e8d14747d16e5553b'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            value: 'build_strength'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a4a9ca3cb7274602a580e0aa626c55e9'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a689e17039134266925534cccfafe8a8'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a6c9f1e57726417dbc90302e7be7ba71'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'question'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7fc4214f4904fd1b6c816600125554f'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'published'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aaf5a46277c14be9bd9c2e8b2a20554b'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b152dfbabade4a93adc97587d245a5b8'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'bio'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b24e457bea82427099a66fefc22737f7'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'answer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7c20679e0c4488c9b0cc3071e0c6154'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'view_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bae9566cf2614acb8cbe3ba3c9e68589'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd0a408bea434d8d961064bc73372a0a'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd868e3d71c84a80bf9a7e9d928a6b16'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'published'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c14217813f044e9db9c0753e27c44783'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c181bf8cf95643b4ab48f50df820a459'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'active'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c46519d088b4463bb5fea4b8ef59991f'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c59c5f187af34b318cfe5f37b5b69fe6'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c8759720b68c4a73be9910c118f8cc16'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'c881a7cebce94749bac6ece63108b23e'
                        key: {
                            role: {
                                id: '0cc04f88c9c14b82a41f8261ebd49378'
                                key: {
                                    name: 'x_snc_amoila_conne.admin'
                                }
                            }
                            contains: {
                                id: '31f8bdeaf69048678240b149fe08dc7a'
                                key: {
                                    name: 'x_snc_amoila_conne.member'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cba7e79f34ee4d93abf8de66b40649b4'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'helpful_yes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce7ac7632653495696a148ffa1616957'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd02f6d4f48c54682b357a009e4d435d4'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'longest_streak'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2be5d8483974839b9226f1965e5d78f'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'icon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3ddd7dd929f436e81b2141c36b684a5'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4b4894670b041ff90205c9d3a7c638b'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'question'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6e155d5ae404199b609fbc31c5df967'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'fitness_level'
                            value: 'intermediate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9e61705762e4b2780d843f18a121a9a'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9f45abe7258457ab8a1bd8da68bf036'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dafe9b438f0943ff84ec8abf6732bc07'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'total_xp'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'dec426772b9846b4a1f02d7ab8c836c8'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e0f52c0c667a4cf0a3b735a132835306'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'join_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e228775e10fc4be3bd86673113d79bcb'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6b27bd5bb9a4412a2a01afce225d54e'
                        key: {
                            name: 'x_snc_amoila_conne_faq'
                            element: 'display_order'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'ed6ce3016494462ba1a1d1ef29b04b03'
                        key: {
                            role: {
                                id: '0cc04f88c9c14b82a41f8261ebd49378'
                                key: {
                                    name: 'x_snc_amoila_conne.admin'
                                }
                            }
                            contains: {
                                id: '801bb86aae8248d1a2ec0124c182b253'
                                key: {
                                    name: 'x_snc_amoila_conne.coach'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee2a8f84f45a4f3ea7ad5e35510b4ff7'
                        key: {
                            name: 'x_snc_amoila_conne_category'
                            element: 'display_order'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee64531236a84294a45f4583b41feed7'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            value: 'chop_wood_carry_water'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eecfda1eb4d246b2b98cf124d49cd3a9'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                            value: 'free_workouts'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f33a339f22e24df89f7b786380e9580f'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f72e08a8900c4575afce53d0c2d9a9d9'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'enrolled_program'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f95c4983e6c74815befad70e06e5deaa'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'primary_goal'
                            value: 'lose_weight'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fddad4cc4b73478ca969085743550b3a'
                        key: {
                            name: 'x_snc_amoila_conne_kb_article'
                            element: 'helpful_yes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff8a998d9dd3415ca9085f75b4bea9df'
                        key: {
                            name: 'x_snc_amoila_conne_member'
                            element: 'active'
                        }
                    },
                ]
            }
        }
    }
}
