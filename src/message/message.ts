// == 200 == //
const DEPOSIT_SUCCESS_MSG = (
  accountNumber: string,
  amount: number,
  balance: number,
) =>
  `${accountNumber}계좌로 ${amount}원 입금 성공하여 잔액은 ${balance}입니다.`;

const WITHDRAW_SUCCESS_MSG = (
  accountNumber: string,
  amount: number,
  balance: number,
) =>
  `${accountNumber}계좌로부터 ${amount}원 출금 성공하여 잔액은 ${balance}입니다.`;

const REMITTANCE_SUCCESS_MSG = (
  fromAccountNumber: string,
  toAccountNumber: string,
  amount: number,
  balance: number,
) =>
  `${fromAccountNumber}계좌에서 ${toAccountNumber}계좌로 ${amount}원 송금 성공하여 ${fromAccountNumber}잔액은 ${balance}입니다.`;

const LOGIN_SUCCESS_MSG = '로그인 성공입니다.';
const SIGNUP_SUCCES_MSG = '회원가입 성공입니다.';

// == 400 == //
const NOT_ENOUGH_BALANCE_EXCEPTION_MSG = '잔액이 부족합니다.';
const DUPLICATE_USERNAME_EXCEPTION_MSG = '이미 존재하는 유저이름이 있습니다.';

// == 401 == //
const NOT_AUTHORIZED_ACCOUNT_EXCEPTION_MSG = '자신의 계좌가 아닙니다.';
const NOT_AUTHORIZED_EXCEPTION_MSG = '로그인이 필요합니다.';
const LOGIN_FAIL_EXCEPTION_MSG = '로그인 실패하였습니다.';

// == 404 == //
const NOT_FOUND_ACCOUNT_EXCEPTION_MSG = '존재하지 않는 계좌입니다.';
