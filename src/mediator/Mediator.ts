import { Injectable } from "@nestjs/common";
import { IComponent, IComponentType, IService } from "./interface";
import { Service } from "./Service";

@Injectable()
export class Mediator extends Service {
 
    constructor(private components: IComponent<IComponentType<any>>[] = [], private service: IService<IComponentType<any>> = new Service){
        super();
    }

    add(component: IComponent<IComponentType<any>>) {
        this.components.push(component)
    };

    notify(msg: IComponentType<any>, _component: IComponent<IComponentType<any>>){
        for(const component of this.components){
            if(component != _component){
                component.recieve(msg)
            }
        }
    };

    
}