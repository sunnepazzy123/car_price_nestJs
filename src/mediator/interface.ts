export interface IComponent<IComponentType> {
    notify: (msg: IComponentType) => void,
    recieve: (msg: IComponentType) => void
}

export interface IComponentType<T> {
    type: string,
    data: T
}


export interface IService<T> {
    mail: (data: T) => void
}