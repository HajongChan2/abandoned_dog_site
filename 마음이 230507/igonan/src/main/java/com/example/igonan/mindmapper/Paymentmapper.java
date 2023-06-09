package com.example.igonan.mindmapper;

import com.example.igonan.dto.PaymentDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
@Mapper
@Transactional
public interface Paymentmapper {

@Select("select * from ubuy;")
 List<PaymentDTO> userBuyList();

@Select("select * from ubuy u where u.u_name = #{buyername} ;")
PaymentDTO findOne(String buyername);


 Integer mindpaymentinsert(String name, String phone,String addr, String saddr,String memo,int count,String cashsel);
// insert명령문의 id인 mindpaymentinsert 호출과 컬럼에 맞게 파라미터 전달
}
