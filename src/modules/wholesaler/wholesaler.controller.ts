import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddWholeSalerDto } from "./dto/addWholesaler.dto";
import { RetailerDto } from "./dto/retailor.dto";
import { AddStockDto } from "./dto/stock.dto";
import { WholeSalerDto } from "./dto/wholeSale.dto";
import { WholeSalerService } from "./wholesaler.service";

@ApiTags('wholeSaler')
@Controller('wholeSaler')
export class UserController {
    constructor(private wholeSalerService: WholeSalerService) { }

    // create whole saler
    @Post('createWholeSaler')
    async createWholeSaler(@Body() dto:WholeSalerDto){
        return await this.wholeSalerService.createWholeSaler(dto).then(res=>{
            if(res){
                return {
                    status:"7400",
                    message:"successfully created",
                    response:res
                }
            }
            else{
                return {
                    status:"7404",
                    message:"failed to create"
                }
            }
        })
    }

    @Post('createRetailer')
    async createRetailer(@Body() dto:RetailerDto){
        return await this.wholeSalerService.createRetailer(dto).then(res=>{
            if(res){
                return {
                    status:"7400",
                    message:"retailer created successfully",
                    response:res
                }
            }
            else{
                return {
                    status:"7404",
                    message:"failed to create"
                }
            }
        })
    };

    @Post('addWholeSalerForexistingRetailer')
    async addWholeSalerForexistingRetailer(@Body() dto:AddWholeSalerDto){
        return await this.wholeSalerService.addWholeSalerForRetailer(dto).then(res=>{
            if(res){
                return {
                    status:"7400",
                    message:"successfully created",
                    response:res
                }
            }
            else{
                return {
                    status:"7404",
                    message:"failed to create"
                }
            }
        })
    }

    @Get('oneWholeSalerDetail/:wholeSalerId')
    async oneWholeSalerDetail(@Param('wholeSalerId') wholeSalerId:number){
        return await this.wholeSalerService.oneWholeSalerDetail(wholeSalerId).then(res=>{
            if(res){
                return{
                    status:"7400",
                    message:"Details of one wholesaler",
                    response:res
                }
            }
            else{
                return{
                    status:"7404",
                    message:"failed to load"
                }
            }
        })
    }

    @Get('oneWholeSalerWithOneRetailor/:wholeSalerId')
    async oneWholeSalerWithOneRetailor(@Param('wholeSalerId') wholeSalerId:number){
        return await this.wholeSalerService.oneWholeSalerDetail(wholeSalerId).then(res=>{
            if(res){
                return{
                    status:"7400",
                    message:"Details of one wholesaler",
                    response:res
                }
            }
            else{
                return{
                    status:"7404",
                    message:"failed to load"
                }
            }
        })
    }

    @Get('oneRetailorWithOneWholeSaler')
    async oneRetailorWithWholeSaler(){
        return await this.wholeSalerService.oneRetailorWithWholeSaler().then(res=>{
            if(res){
                return{
                    status:"7400",
                    message:"oneRetailorWithOneWholeSaler",
                    response:res
                }
            }
            else{
                return{
                    status:"7404",
                    message:"failed to load"
                }
            }
        })
    }

    @Post('addStockDetails')
    async addStockDetails(@Body() dto:AddStockDto){
        return await this.wholeSalerService.addStockDetails(dto).then(res=>{
            if( res ){
                return {
                    status:"7400",
                    message:"stock details added",
                    response:res
                }
            }
            else{
                return {
                    status:"7404",
                    message:"failed"
                }
            }
        })
    }

    @Get('overallTurnover')
    async overallTurnover(){
        return await this.wholeSalerService.monthlyTurnover().then(res=>{
            if(res){
                return {
                    status:"7404",
                    message:"done",
                    Response:res
                }
            }else{
                return {
                    status:"7404",
                    message:"done"
                }
            }
        })
    }

}