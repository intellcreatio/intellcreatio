type AnyStringKeyObject = { [key: string]: string };

export interface InteractionsRouter {
    commands: AnyStringKeyObject;
    buttons: AnyStringKeyObject;
    select_menus: AnyStringKeyObject;
    user_context_menu: AnyStringKeyObject;
    message_context_menu: AnyStringKeyObject;
}
