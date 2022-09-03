
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";


export interface Person {
    id:Number,
    first_name:string,
    last_name:string,
    email:string,
    age:Number,
    country:string,
    phone:string
}




const columnHelper = createColumnHelper<Person>()

export const columns = [


        columnHelper.accessor("id",{
            header:"ID",
           
        }),
        columnHelper.accessor("first_name",{
            header:"First Name ",
            
        }),
        columnHelper.accessor("last_name",{
            header:"Last Name ",
            
        }),
        columnHelper.accessor("email",{
            header:"Email",
            
        }),
        columnHelper.accessor("age",{
            header:"Age",
            
        }),
        columnHelper.accessor("country",{
            header:"Country",
            
        }),
         columnHelper.accessor("phone",{
            header:"Phone",
            // footer:props=>props.column.id
        }),
    ] 
