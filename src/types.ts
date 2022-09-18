export type AnyStringKeyObject = { [key: string]: string };
export type If<C extends boolean, T, F> = C extends true ? T : F;

export interface InteractionsRouter {
    commands: AnyStringKeyObject;
    buttons: AnyStringKeyObject;
    select_menus: AnyStringKeyObject;
    user_context_menu: AnyStringKeyObject;
    message_context_menu: AnyStringKeyObject;
}
