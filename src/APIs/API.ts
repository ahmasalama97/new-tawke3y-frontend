import axios from 'axios';

// ----------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const formDataHeaders = {
  'Content-Type': 'multipart/form-data',
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

const authHeaders = (token?: string) => {
  const bearer = token || localStorage.getItem('token') || '';
  return bearer
    ? {
        ...jsonHeaders,
        Authorization: `Bearer ${bearer}`,
      }
    : jsonHeaders;
};

// ----------------------------------------------------------------------
// Auth
// ----------------------------------------------------------------------

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  mobile?: string;
  address?: string;
  role?: string;
  registrationnumber?: string | null;
  taxcardnumber?: string | null;
  emailvalidation?: number;
  signvalidation?: number;
  userstatus?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const Register_API = (data: RegisterPayload) =>
  api.post('/api/register', data, { headers: jsonHeaders });

export const Login_API = (data: LoginPayload) =>
  api.post('/api/login', data, { headers: jsonHeaders });

export const Logout_API = (token?: string) =>
  api.post('/api/logout', undefined, { headers: authHeaders(token) });

export const Me_API = (token?: string) =>
  api.post('/api/me', undefined, { headers: authHeaders(token) });

export const ChangePassword_API = (data: { password: string; newpassword: string; confirmpassword: string }, token?: string) =>
  api.post('/api/changepassword', data, { headers: authHeaders(token) });

export const SendMail_API = (data: { email: string }) =>
  api.post('/api/sendmail', data, { headers: jsonHeaders });

export const ResetPassword_API = (data: { email: string; password: string; confirmpassword: string }) =>
  api.post('/api/resetpassword', data, { headers: jsonHeaders });

// Email verification / OTP

export const VerifyEmail_API = (data: { email: string; code: string }) =>
  api.post('/api/verifyemail', data, { headers: jsonHeaders });

export const ResendCode_API = (data: { email: string }) =>
  api.post('/api/resendcode', data, { headers: jsonHeaders });

// ----------------------------------------------------------------------
// User & Profile
// ----------------------------------------------------------------------

export const EditUser_API = (data: FormData, token?: string) =>
  api.post('/api/edituser', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const GetUserValidationForUpdate_API = (token?: string) =>
  api.post('/api/getuservalidationforupdate', undefined, { headers: authHeaders(token) });

export const GetUserValidation_API = (data: { id: number | string }, token?: string) =>
  api.post('/api/getuservalidation', data, { headers: authHeaders(token) });

export const UserInfoProfile_API = (data: FormData, token?: string) =>
  api.post('/api/userinfoprofile', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

// ----------------------------------------------------------------------
// Contracts (user)
// ----------------------------------------------------------------------

export interface GetContractsPayload {
  username: string;
  page: number;
  search: string;
  signed: number;
}

export const GetContracts_API = (data: GetContractsPayload, token?: string) =>
  api.post('/api/getcontracts', data, { headers: authHeaders(token) });

export const GenerateContract_API = (
  data: {
    pdf: string;
    companyname: string;
    companyaddress: string;
    companysignature: string;
    companyid: number;
    contractname: string;
  },
  token?: string
) => api.post('/api/generatePdfText', data, { headers: authHeaders(token) });

export const GetGeneratedContract_API = (contractid: string | number, token?: string) =>
  api.get(`/api/contract/${contractid}`, { headers: authHeaders(token), responseType: 'blob' });

// ----------------------------------------------------------------------
// Company contracts
// ----------------------------------------------------------------------

export const UploadContractToUser_API = (data: FormData, token?: string) =>
  api.post('/api/uploadcontract', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const UploadPersonalContract_API = (data: FormData, token?: string) =>
  api.post('/api/uploadpersonalcontract', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const GetPersonalContracts_API = (
  data: {
    page: number;
    search: string;
  },
  token?: string
) => api.post('/api/getpersonalcontracts', data, { headers: authHeaders(token) });

export const DeleteContract_API = (data: { contractid: string | number }, token?: string) =>
  api.post('/api/deletecontract', data, { headers: authHeaders(token) });

// ----------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------

export const UploadServiceContract_API = (data: FormData, token?: string) =>
  api.post('/api/uploadServiceContracts', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const GetServiceContracts_API = (
  data: {
    serviceid: number;
    page: number;
  },
  token?: string
) => api.post('/api/getservicescontracts', data, { headers: authHeaders(token) });

// ----------------------------------------------------------------------
// Additional Tawke3y endpoints (from old API.js)
// ----------------------------------------------------------------------

export const GetUserContracts_API = (
  data: {
    page: number;
    search: string;
    signed: number;
    companyid?: number | string;
    userid?: number | string;
  },
  token?: string
) =>
  api.post('/api/getusercontracts', data, {
    headers: authHeaders(token),
  });

export const GetAllUsersAndCompanies_API = (
  data: {
    page: number;
    search: string;
  },
  token?: string
) =>
  api.post('/api/getallusersandcompanies', data, {
    headers: authHeaders(token),
  });

export const GetUserDetails_API = (data: { id: number | string }, token?: string) =>
  api.post('/api/getuserdetails', data, {
    headers: authHeaders(token),
  });

export const ShareContract_API = (data: { contractid: string | number; email?: string }, token?: string) =>
  api.post('/api/sharecontract', data, {
    headers: authHeaders(token),
  });

export const DeletePersonalContract_API = (data: { contractid: string | number }, token?: string) =>
  api.post('/api/deletepersonalcontract', data, {
    headers: authHeaders(token),
  });

export const GetCompanySignaturedContracts_API = (
  data: {
    page: number;
    search: string;
    userid?: number | string;
  },
  token?: string
) =>
  api.post('/api/getcompanysignaturedcontracts', data, {
    headers: authHeaders(token),
  });

export const SignContract_API = (
  data: {
    contractid: string | number;
    signature?: string;
  },
  token?: string
) =>
  api.post('/api/signcontract', data, {
    headers: authHeaders(token),
  });

export const UploadSignaturedContract_API = (data: FormData, token?: string) =>
  api.post('/api/uploadsignaturedcontract', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const UploadFinancialSignaturedContract_API = (data: FormData, token?: string) =>
  api.post('/api/uploadfinancialsignaturedcontract', data, {
    headers: {
      ...authHeaders(token),
      ...formDataHeaders,
    },
  });

export const GetFinancialContract_API = (
  data: { contractid: string | number },
  token?: string
) =>
  api.post('/api/getfinancialcontracts', data, {
    headers: authHeaders(token),
  });

export const DeactivateAccount_API = (data: unknown, token?: string) =>
  api.post('/api/deactivateAccount', data, {
    headers: authHeaders(token),
  });

export const VerifyUserAccount_API = (data: unknown, token?: string) =>
  api.post('/api/verifyuseraccount', data, {
    headers: authHeaders(token),
  });

export const Verify_API = (data: { code: string; email?: string }, token?: string) =>
  api.post('/api/verify', data, {
    headers: authHeaders(token),
  });

export const ResetPasswordPhone_API = (data: { phone: string; password: string; confirmpassword: string }) =>
  api.post('/api/resetpasswordphone', data, {
    headers: jsonHeaders,
  });

