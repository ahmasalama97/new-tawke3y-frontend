import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { SnackbarProvider } from "notistack"
import {
  Contracts,
  CreatePdf,
  Home,
  Login,
  NoMatch,
  NotAuthorized,
  AccessForbidden,
  Privacy,
  Profile,
  Register,
  SignaturedContracts,
  About,
  TermsConditions,
  CompanyContracts,
  CompanySignaturedContracts,
  CompleteProfile,
  VerifyCode,
  AllUsers,
  UserDetails,
  UserContracts,
  HomePrivacy,
  HomeTerms,
  ForgetPassword,
  VerifyEmail,
  ResetPassword,
  FaceRecognition,
  VerifyMethod,
  ForgetPasswordWithPhone,
  ResetPasswordPhone,
} from "./Screens"
import PrivateRoute from "./Services/PrivateRoute"
import AccessRoute from "./Services/AccessRoute"
import { CompleteProfileContextprovider } from "./Contexts/CompleteProfileContext"
import { LanguageConsumer, LanguageProvider } from "./Contexts/LanguageContext"

const queryClient = new QueryClient()

function App() {
  return (
    <LanguageProvider>
      <LanguageConsumer>
        {({ language }) => (
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
              <CompleteProfileContextprovider>
                <div className={language === "english" ? "App" : "AppAr"}>
                  <Routes>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="policy-privacy" element={<HomePrivacy />} />
                    <Route path="terms-conditions" element={<HomeTerms />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                      path="forget-password"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="forget-password-phone"
                      element={<ForgetPasswordWithPhone />}
                    />
                    <Route path="verify-method" element={<VerifyMethod />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route
                      path="reset-password-phone"
                      element={<ResetPasswordPhone />}
                    />
                    <Route
                      path="verify"
                      element={
                        <PrivateRoute
                          path="/verify"
                          component={
                            <AccessRoute
                              role="user"
                              component={<VerifyCode />}
                            />
                          }
                        />
                      }
                    />
                    <Route path="verify-email" element={<VerifyEmail />} />
                    <Route
                      path="complete-profile/:token/:id"
                      element={
                        <PrivateRoute
                          path="/complete-profile/:token/:id"
                          component={<CompleteProfile />}
                        />
                      }
                    />
                    <Route
                      path="contracts"
                      element={
                        <PrivateRoute
                          path="/contracts"
                          component={
                            <AccessRoute
                              role="user"
                              component={<Contracts />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="my-contracts"
                      element={
                        <PrivateRoute
                          path="/my-contracts"
                          component={
                            <AccessRoute
                              role="company"
                              component={<CompanyContracts />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="my-signatured-contracts"
                      element={
                        <PrivateRoute
                          path="/my-signatured-contracts"
                          component={
                            <AccessRoute
                              role="company"
                              component={<CompanySignaturedContracts />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="signatured-contracts"
                      element={
                        <PrivateRoute
                          path="/signatured-contracts"
                          component={
                            <AccessRoute
                              role="user"
                              component={<SignaturedContracts />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <PrivateRoute
                          path="/users"
                          component={
                            <AccessRoute
                              role="company"
                              component={<AllUsers />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="users/user-details/:id"
                      element={
                        <PrivateRoute
                          path="/users/user-details/:id"
                          component={
                            <AccessRoute
                              role="company"
                              component={<UserDetails />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="users/user-contracts/:id/:signed"
                      element={
                        <PrivateRoute
                          path="/users/user-contracts/:id/:signed"
                          component={
                            <AccessRoute
                              role="company"
                              component={<UserContracts />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="verifyinguser/:id"
                      element={<FaceRecognition />}
                    />
                    <Route
                      path="my-contracts/create-contract"
                      element={
                        <PrivateRoute
                          path="/my-contracts/create-contract"
                          component={
                            <AccessRoute
                              role="company"
                              component={<CreatePdf />}
                            />
                          }
                        />
                      }
                    />
                    <Route
                      path="profile"
                      element={
                        <PrivateRoute path="/profile" component={<Profile />} />
                      }
                    />
                    <Route
                      path="privacy"
                      element={
                        <PrivateRoute path="/privacy" component={<Privacy />} />
                      }
                    />
                    <Route
                      path="about"
                      element={
                        <PrivateRoute path="/about" component={<About />} />
                      }
                    />
                    <Route
                      path="terms"
                      element={
                        <PrivateRoute
                          path="/terms"
                          component={<TermsConditions />}
                        />
                      }
                    />
                    <Route path="not-authorized" element={<NotAuthorized />} />
                    <Route path="forbidden" element={<AccessForbidden />} />
                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </div>
              </CompleteProfileContextprovider>
            </SnackbarProvider>
          </QueryClientProvider>
        )}
      </LanguageConsumer>
    </LanguageProvider>
  )
}

export default App
