import axios from "axios";
import { API } from "../index";
import { sha256 } from "js-sha256";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";

const Context = createContext();
export default function AuthContextProvider(props) {
  const { goToPage, showToast, handleError, setLoading, setSession, getSession, resetSession } = useSystemContext();
  const [hasLogin, setHasLogin] = useState(false);
  const [isStudent, setIsStudent] = useState();
  const [isCompany, setIsCompany] = useState();
  const [user, setUser] = useState(getSession("user") ?? null);

  const handleUser = useCallback((user) => {
    if (user) {
      user.password = "";
    }
    setSession("user", user);
    setUser(user);
    setHasLogin(user != null);
    setIsCompany(user != null && user.role === "company")
    setIsStudent(user != null && user.role === "student")
  }, [setSession])


  useEffect(() => {
    handleUser(getSession("user"));
  }, [getSession, handleUser]);


  const signUpStudent = async (user) => {
    handleError(null)
    try {
      setLoading(true);
      user.password = sha256(user.password).toString();
      user.role = "student";
      const response = await axios.post(`${API}/student/sign-up`, user);
      setLoading(false);

      if (response.status === 200) {
        user = response.data;
        user.password = "";
        handleUser(user);
        showToast("success", "تم التسجيل بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message ?? error.message;
      handleError(msg);
    }
  };



  const signUpCompany = async (user) => {
    try {
      setLoading(true);
      user.password = sha256(user.password).toString();
      user.role = "company";
      const response = await axios.post(`${API}/company/sign-up`, user);
      setLoading(false);

      if (response.status === 200) {
        user = response.data;
        user.password = "";
        handleUser(user);
        showToast("success", "تم التسجيل بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  };

  const updateUser = async ({ data, _id, role }) => {
    try {
      setLoading(true);
      const dataToUpdate = Object.fromEntries(
        Object.keys(data)
          .filter(key => key !== 'password' && key !== "email")
          .map(key => [key, data[key]])
      );
      const response = await axios.patch(`${API}/${role}/${_id}`, dataToUpdate);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        handleUser(data)
        showToast("success", "Updating success!")
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }
  }

  const signIn = async ({ email, password, role }) => {
    try {
      setLoading(true);
      const hash = sha256(password);
      console.log(hash);
      const response = await axios.post(`${API}/${role}/sign-in`, { email: email, password });
      setLoading(false);

      if (response.status === 200) {
        const user = response.data;
        handleUser(user);
        showToast("success", "Sign in success!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  };


  const signOut = () => {
    handleUser(null);
    resetSession();
    goToPage("/");
  }

  const resetPassword = async ({ secretQuestion, secretAnswer }) => {
    try {
      setLoading(true);
      const hash = sha256(secretAnswer);
      const ob = { secretQuestion: secretQuestion, secretAnswer: hash };

      const response = await axios.post(`${API}/reset-password`, ob);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        goToPage("reset-password");
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      handleError(error.message)
    }

  }

  const setSecret = async ({ secretQuestion, secretAnswer }) => {
    try {
      setLoading(true);
      const hash = sha256(secretAnswer);
      const ob = { uid: user._id, secretQuestion: secretQuestion, secretAnswer: hash };
      const role = user.role;
      const response = await axios.post(`${API}/${role}/secret`, ob);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        showToast("success", "Secret info added successfully!")
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }


  const value = {
    user,
    signUpStudent,
    signUpCompany,
    signIn,
    signOut,
    resetPassword,
    setSecret,
    hasLogin,
    isCompany,
    isStudent,
    updateUser,
  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useAuthContext = () => useContext(Context);

