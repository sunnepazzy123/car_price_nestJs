import { IComponentType, IService } from "./interface";


export class Service implements IService<IComponentType<any>> {

    mail(data: IComponentType<any>) {
        console.log("mail is sent successfully ", data)
    }

    print() {
        console.log("service printing")
    }
}