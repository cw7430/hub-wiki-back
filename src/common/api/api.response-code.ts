import { HttpStatus } from '@nestjs/common';

const ResponseCode = {
  SUCCESS: {
    code: 'SU',
    message: '요청이 성공적으로 처리되었습니다.',
    status: HttpStatus.OK,
  },

  VALIDATION_ERROR: {
    code: 'VE',
    message: '입력값이 잘못되었습니다.',
    status: HttpStatus.BAD_REQUEST,
  },

  UNAUTHORIZED: {
    code: 'UA',
    message: '로그인이 필요합니다.',
    status: HttpStatus.UNAUTHORIZED,
  },

  LOGIN_ERROR: {
    code: 'LGE',
    message: '아이디 또는 비밀번호가 잘못되었습니다.',
    status: HttpStatus.UNAUTHORIZED,
  },

  FORBIDDEN: {
    code: 'FB',
    message: '접근 권한이 없습니다.',
    status: HttpStatus.FORBIDDEN,
  },

  RESOURCE_NOT_FOUND: {
    code: 'RNF',
    message: '요청한 자원을 찾을 수 없습니다.',
    status: HttpStatus.NOT_FOUND,
  },

  ENDPOINT_NOT_FOUND: {
    code: 'ENF',
    message: '요청한 경로가 잘못되었습니다.',
    status: HttpStatus.NOT_FOUND,
  },

  DUPLICATE_RESOURCE: {
    code: 'DR',
    message: '이미 존재하는 항목입니다.',
    status: HttpStatus.CONFLICT,
  },

  CONFLICT: {
    code: 'CF',
    message: '요청이 현재 상태와 충돌합니다.',
    status: HttpStatus.CONFLICT,
  },

  INTERNAL_SERVER_ERROR: {
    code: 'ISE',
    message: '서버에서 문제가 발생했습니다.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

export default ResponseCode;
export type ResponseCodeKey = keyof typeof ResponseCode;