// https://react.christmas/2020/22\

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
}

export type {ColumnDefinitionType};