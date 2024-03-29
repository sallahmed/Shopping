import { Menu } from './menu.model';

export const horizontalMenuItems = [
    new Menu (1, 'Tableau de bord', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (30, 'Contrôles', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
    new Menu (32, 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
    new Menu (33, 'Evaluation maturité', '/controles/evaluation-maturite', null, 'view_module', null, false, 30),
    new Menu (40, 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
    new Menu (70, 'Reportings', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Reporting financier', '/reportings/financier', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Sunshines Initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Types Sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 70),
    new Menu (50, 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
]

export const porteurMenuItems = [
    new Menu (1, 'Tableau de bord', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (10, 'Contrôles', null, null, 'view_module', null, true, 0),
    new Menu (11, 'Liste des contrôles', '/controles/mes-controles', null, 'view_column', null, false, 10),
    new Menu (12, 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 10),
    new Menu (20, 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
    new Menu (30, 'Reportings', null, null, 'multiline_chart', null, true, 0),
    new Menu (31, 'Reporting compliance', '/reportings/compliance-porteur', null, 'insert_chart', null, false, 30),
    new Menu (32, 'Reporting financier', '/reportings/financier', null, 'pie_chart', null, false, 30),
]

export const adminMenuItems = [
    new Menu (1,  'Tableau de bord', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Utilisateurs', '/users', null, 'supervisor_account', null, false, 0),
    new Menu (20, 'Paramètres', null, null, 'dvr', null, true, 0),
    new Menu (22, 'Entité', '/parametres/entites', null, 'check_box', null, false, 20),
    new Menu (24, 'Activité', '/parametres/activites', null, 'view_stream', null, false, 20),
    new Menu (26, 'Type trafic', '/parametres/types-trafics', null, 'radio_button_checked', null, false, 20),
    new Menu (27, 'Méthode de contrôle', '/parametres/methodes-controles', null, 'playlist_add_check', null, false, 20),
    new Menu (28, 'Type de contrôle', '/parametres/types-controles', null, 'tune', null, false, 20),
    new Menu (29, 'Contrôles', '/parametres/controles', null, 'star_half', null, false, 20),
    new Menu (30, 'Contrôles', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
    new Menu (32, 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
    new Menu (33, 'Evaluation maturité', '/controles/evaluation-maturite', null, 'view_module', null, false, 30),
    new Menu (40, 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
    new Menu (70, 'Reportings', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Reporting financier', '/reportings/financier', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Sunshines Initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Types Sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 70),
    new Menu (50, 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
]


export const superAdminMenuItems = [
    new Menu (1, 'Tableau de bord', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Utilisateurs', '/users', null, 'supervisor_account', null, false, 0),
    new Menu (20, 'Paramètres', null, null, 'dvr', null, true, 0),
    new Menu (21, 'Controles', '/parametres/controles', null, 'short_text', null, false, 20),
    new Menu (22, 'Entité', '/parametres/entites', null, 'check_box', null, false, 20),
    new Menu (23, 'Type Structure', '/parametres/types-structures', null, 'today', null, false, 20),
    new Menu (24, 'Activité', '/parametres/activites', null, 'view_stream', null, false, 20),
    new Menu (25, 'Périodicité', '/parametres/periodicites', null, 'input', null, false, 20),
    new Menu (26, 'Type trafic', '/parametres/types-trafics', null, 'radio_button_checked', null, false, 20),
    new Menu (27, 'Méthode de contrôle', '/parametres/methodes-controles', null, 'playlist_add_check', null, false, 20),
    new Menu (28, 'Type de contrôle', '/parametres/types-controles', null, 'tune', null, false, 20),
    new Menu (29, 'Flux', '/parametres/flux', null, 'tune', null, false, 20),
    new Menu (30, 'Contrôles', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
    new Menu (32, 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
    new Menu (40, 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
    new Menu (70, 'Reportings', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Reporting financier', '/reportings/financier', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Sunshines Initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (72, 'Types Sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 70),
    new Menu (50, 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
]