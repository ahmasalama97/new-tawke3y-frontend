import axios from "axios"

// const token = document.head.querySelector('meta[name="csrf-token"]').content

const axiosheaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // "axios.defaults.withCredentials": true,
  // "axios.defaults.xsrfHeaderName": "X-CSRFTOKEN",
  // "axios.defaults.xsrfCookieName": token,
}

const axiosuploadheaders = {
  "Content-Type": "multipart/form-data",
  // "axios.defaults.withCredentials": true,
  // "axios.defaults.xsrfHeaderName": "X-CSRFTOKEN",
  // "axios.defaults.xsrfCookieName": token,
}

export const CreateUser_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/createuser`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const Login_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/login`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const SendMail_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/sendmail`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetContract_API = ({ axiosdata, contractid }) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getcontract?contractid=${contractid}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetFinancialContract = ({ axiosdata, contractid }) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getfinancialcontracts?contractid=${contractid}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const UploadSignaturedContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/uploadsignaturedcontract`,
    headers: axiosuploadheaders,
    data: axiosdata,
    transformRequest: (data) => {
      return data
    },
  })
  return axiosfetch
}

export const GenerateContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/generatePdfText`,
    headers: axiosuploadheaders,
    data: axiosdata,
    transformRequest: (data) => {
      return data
    },
  })
  return axiosfetch
}

export const UploadFinancialSignaturedContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/uploadfinancialsignaturedcontract`,
    headers: axiosuploadheaders,
    data: axiosdata,
    transformRequest: (data) => {
      return data
    },
  })
  return axiosfetch
}

export const GetContracts_API = ({
  axiosdata,
  pageParam = 1,
  search,
  signed,
  username,
}) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getcontracts?page=${pageParam}&&search=${search}&&signed=${signed}&&username=${username}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}
export const GetUserContracts_API = ({
  axiosdata,
  pageParam = 1,
  search,
  signed,
  companyId,
  userid,
}) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getusercontracts?page=${pageParam}&&search=${search}&&signed=${signed}&&companyid=${companyId}&&userid=${userid}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetPersonalContracts_API = ({
  axiosdata,
  pageParam = 1,
  search,
  userid,
}) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getpersonalcontracts?page=${pageParam}&&search=${search}&&userid=${userid}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetAllUsersAndCompanies_API = ({
  axiosdata,
  pageParam = 1,
  search,
}) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getallusersandcompanies?page=${pageParam}&&search=${search}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetUserDetails_API = ({ axiosdata, id }) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getuserdetails?id=${id}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetUserValidation_API = ({ axiosdata, id }) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getuservalidation?id=${id}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const ShareContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/sharecontract`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const DeletePersonalContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/deletepersonalcontract`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const GetCompanySignaturedContracts_API = ({
  axiosdata,
  pageParam = 1,
  search,
  userid,
}) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/getcompanysignaturedcontracts?page=${pageParam}&&search=${search}&&userid=${userid}`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const SignContract_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/signcontract`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const EditUser_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/edituser`,
    headers: axiosuploadheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const ChangePassword_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/changepassword`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const Logout_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/logout`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const DeactivateAccount_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/deactivateAccount`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const UserInfoProfile_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/userinfoprofile`,
    headers: axiosuploadheaders,
    data: axiosdata,
    transformRequest: (data) => {
      return data
    },
  })
  return axiosfetch
}

export const VerifyUserAccount_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/verifyuseraccount`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const Verify_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/verify`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const VerifyEmail_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/verifyemail`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const ResendCode_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/resendcode`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}

export const ResetPassword_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/resetpassword`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}
export const ResetPasswordPhone_API = (axiosdata) => {
  const axiosfetch = axios({
    method: "post",
    url: `${process.env.REACT_APP_ENDPOINT_URL}/resetpasswordphone`,
    headers: axiosheaders,
    data: axiosdata,
  })
  return axiosfetch
}
