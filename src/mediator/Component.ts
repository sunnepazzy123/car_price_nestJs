import { Injectable } from "@nestjs/common";
import { IComponent, IComponentType } from "./interface";
import { Mediator } from "./Mediator";

@Injectable()
export class Component implements IComponent<IComponentType<any>>{
    
    constructor(private mediator: Mediator, private name: string){}

    notify(msg: IComponentType<any>) {
        console.log(this.name + " Out " + msg)
        this.mediator.notify(msg, this)
    };

    recieve(msg: IComponentType<any>) {
        console.log(this.name + " IN " + msg)
      if(msg.type === "mailer"){
          this.mediator.mail(msg.data)
      }
      this.mediator.print()
    };

}