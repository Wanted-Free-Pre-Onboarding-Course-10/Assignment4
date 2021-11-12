import { PageRequest } from '../../common/abstract/page.request';
import { IsIn } from 'class-validator';
import {
  orderType,
  searchType,
} from '../../common/types/transaction.history.search.type';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TransactionHistoryPaginationRequest extends PageRequest {
  constructor() {
    super();
  }

  @Field((type) => String)
  accountNumber: string;

  @Field((type) => String)
  startDate: string;

  @Field((type) => String)
  endDate: string;

  @Field((type) => String)
  @IsIn(searchType)
  searchType: string;

  @Field((type) => String)
  @IsIn(orderType)
  orderType: 'DESC' | 'ASC';

  // 추후 검색 필터 데이터를 추가로 넣어도 됨 ex) title, content
}
