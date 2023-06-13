package com.example.igonan.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;

@Controller
public class MindController {


    @RequestMapping("/")
    public String mmain( ) {

        return "main";
    }
    @RequestMapping("/main")
    public String main( ) {

        return "main";
    }
    @RequestMapping("/login")
    public String login( ) {

        return "member/login";
    }
    @RequestMapping("/join")
    public String join( ) {

        return "member/join";
    }
    @RequestMapping("/mypage")
    public String mypage( ) {

        return "member/member_page";
    }
    @RequestMapping("/alter")
    public String mypagealter( ) {

        return "member/member_info";
    }
    @RequestMapping("/info")
    public String information( ) {


        return "service/information";
    }
    @RequestMapping("/abandog/detail")
    public String abandog_detail() {


        return "abandog/abandog_detail";
    }
    @RequestMapping("/abandog/form")
    public String abandog_form( ) {


        return "service/abandog_form";
    }
    @RequestMapping("/abandog/list")
    public String dog_adoption( ) {


        return "abandog/abandog_list";
    }

    @RequestMapping("/dog/detail")
    public String dog_detail_inq( ) {

        return "dog/dog_detail";
    }

    @RequestMapping("/dog/list")
    public String dog_inquiry( ) {

        return "dog/dog_list";
    }
    @RequestMapping("/admin/product/insert")
    public String dog_infomation_detail( ) {


        return "admin/product_insert";
    }
    @RequestMapping("/admin/abandog/insert")
    public String abandogdetailinsert( ) {

        return "admin/abandog_insert";
    }
    @RequestMapping("/admin/abandog/update")
    public String abandogdetailupdate( ) {

        return "admin/abandog_insert";
    }
    @RequestMapping("/admin/product/update")
    public String productdetailupdate( ) {

        return "admin/product_insert";
    }

    @RequestMapping("/petcesary")
    public String petcesary(){

        return "product/petcesory";
    }
    @RequestMapping("/product/detail")
    public String petcede(){

        return "product/product_detail";
    }


    @RequestMapping("/payment")
    public String payment(){

        return "service/payment";
    }
    @RequestMapping("/purchase")
    public String purchase(){

        return "service/product_select";
    }
    @RequestMapping("/productbuy")
    public String productbuy(){

        return "product/productbuy";
    }



    @RequestMapping("/userbuylist")
    public String test(){

        return "test";
    }

    @RequestMapping("/doglists")
    public String dogdogtest(){

        return "testdog";
    }





}
