import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetailerDto } from './dto/retailor.dto';
import { WholeSalerDto } from './dto/wholeSale.dto';
import { retailer } from './entity/retailer.entity';
import { wholeSaler } from './entity/wholesaler.entity';
import { randomBytes } from 'crypto'
import { AddWholeSalerDto } from './dto/addWholesaler.dto';
import { stock } from './entity/stock.entity';
import { AddStockDto } from './dto/stock.dto';
import moment from 'moment';

@Injectable()
export class WholeSalerService {
    constructor(
        @Inject('WHOLE_SALER_REPOSITORY') private wholeSalerRepository: Repository<wholeSaler>,
        @Inject('RETAILER_REPOSITORY') private retailorRepository:Repository<retailer>,
        @Inject('STOCK_REPOSITORY') private stockRepository:Repository<stock>
    ){}
    
    async createWholeSaler(dto:WholeSalerDto){
        dto.createdOn=new Date();
        return await this.wholeSalerRepository.save(dto)
    }

    async createRetailer(dto:RetailerDto){
        const id = randomBytes(4).toString("hex");
        dto.retailerId=id;
        dto.createdOn=new Date();
        return await this.retailorRepository.save(dto)
    }

    async oneWholeSalerDetail(wholeSalerId:number){
        const wholeSaler=await this.wholeSalerRepository.query(`SELECT wholesalers.id,
        wholesalers.name,
        wholesalers.mobile_number
        FROM wholesalers
        WHERE wholesalers.id=${wholeSalerId}`);

        const retailors= await this.wholeSalerRepository.query(`SELECT retailer.id as retailorId,
        retailer.name,
        retailer.mobile_number
        FROM retailer
        WHERE retailer.wholeSalerId=${wholeSalerId}`);
        if(wholeSaler.length>0){
               return {
                   name:wholeSaler[0].name,
                   mobile:wholeSaler[0].mobile_number,
                   retailors:retailors
           }
        }
    }
    async addWholeSalerForRetailer(dto:AddWholeSalerDto){
        const retailer= await this.wholeSalerRepository.query(`SELECT retailer.id as retailorId,
        retailer.name,
        retailer.mobile_number
        FROM retailer
        WHERE retailer.retailerId="${dto.retailerId}"`);
        for (const obj of retailer){
            dto.mobile_number=obj.mobile_number;
            dto.createdOn=new Date();
            dto.name=obj.name
            return await this.retailorRepository.save(dto)
        }
    }

    async oneRetailorWithWholeSaler(){
        const retailer= await this.wholeSalerRepository.query(`SELECT retailer.retailerId,COUNT(*) as number,
        FROM stock
        GROUP BY retailerId
        HAVING COUNT(*) <= 1`);
        return retailer
     }

     async addStockDetails(dto:AddStockDto){
         dto.date=new Date()
        return this.stockRepository.save(dto)
     }

     async overallTurnover(){
        return await this.wholeSalerRepository.query(`SELECT SUM(stock_amount) as amount,
         wholesaler_id
         FROM stock
         GROUP BY wholesaler_id`);
     }

     async monthlyTurnover(){
        const monthly=await this.wholeSalerRepository.query(`SELECT stock.wholesaler_id,
        stock.stock_amount,
        DATE_FORMAT(stock.date,'%Y-%m-%d %r') as date,
        wholesalers.name
        FROM stock
        LEFT JOIN wholesalers
        ON wholesalers.id=stock.wholesaler_id
        order by date`);
        // if(monthly){
            
        //     const wholesalerId=[...new Set(monthly.map(item=>{
        //         return {wholesalerId:item.wholesaler_id}
        //     }))]
        //     const getUniqueWholesaleId=[...new Map(wholesalerId.map(obj=>[obj["wholesalerId"],obj])).values()]
        //     let monthlywise=[]
        //     for(const obj of getUniqueWholesaleId){
        //         let objects=[]
        //         for(const datas of monthly){
        //             if(obj["wholesalerId"]===datas.wholesaler_id){
        //                 let tempData={
        //                     stockAmount:datas.stock_amount,
        //                     date:datas.date
        //                 }
        //                 objects.push(tempData)
        //             }
        //          }
        //         obj["yearlyTurnover"]=objects.reduce((n,{stockAmount})=>n+stockAmount,0);
        //         obj["monthlywise"]=objects
        //         // const monthlyData=[]
                
        //         // for (const d of objects){
        //         //     var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //         //     let day = new Date(d.date);
        //         //     var monthName=months[day.getMonth()];
        //         //     let tempData={
        //         //         month:monthName,
        //         //         stock:d.stockAmount
        //         //     }
        //         //     monthlyData.push(tempData)
        //         // }

        //         const uniqueDates = [...new Set(objects.map(item => item.date))]

        //         let monthData=[]
        //         for(const obj of uniqueDates){
        //             // console.log(obj)
        //              let data=[]
        //              for(const items of objects){
        //                 //  console.log(items)
        //                 let d: any = obj
        //                 if (new Date(d).getTime() === new Date(items.date).getTime()){
        //                 let tempData={ items }
        //                 data.push(tempData)
        //                 console.log(tempData)
        //                }  
        //              }
        //             //  console.log(data)            
        //         }
        //         // console.log(monthlyData)
                
        //         monthlywise.push(obj)
        //     }
                       
        //     return monthlywise
        // }

        if (monthly) {

            const wholesalerId = [...new Set(monthly.map(item => {
                return { wholesalerId: item.wholesaler_id }
            }))]
            const getUniqueWholesaleId = [...new Map(wholesalerId.map(obj => [obj["wholesalerId"], obj])).values()]
            let monthlywise = []
            for (const obj of getUniqueWholesaleId) {
                let objects = []
                for (const datas of monthly) {
                    if (obj["wholesalerId"] === datas.wholesaler_id) {
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        let day = new Date(datas.date);
                        const monthName = months[day.getMonth()];
                        let tempData = {
                            stockAmount: datas.stock_amount,
                            month: monthName
                        }
                        objects.push(tempData)
                    }
                }
                obj["yearlyTurnover"] = objects.reduce((n, { stockAmount }) => n + stockAmount, 0);
                obj["Monthly"] = objects
        
                monthlywise.push(obj)
            };
        
            for (const obj of monthlywise) {
                console.log(obj.Monthly);
                const stockRes = obj.Monthly.reduce((acc, cur) => {
                    acc[cur.month] = acc[cur.month] + cur.stockAmount || cur.stockAmount;
                    return acc;
                }, {});
                console.log(Object.keys(stockRes).length);
                if (Object.keys(stockRes).length > 1) {
                    obj["Monthly"] = obj.Monthly;
                } else {
                    let temp = {
                        "stockAmount": stockRes[obj.Monthly[0].month],
                        "month": obj.Monthly[0].month,
                    }
                    obj["Monthly"] = [];
                    obj["Monthly"].push(temp);
                }
            }
        
            console.log(JSON.stringify(monthlywise, null, 4));
            return 'done'
        }
     }

}