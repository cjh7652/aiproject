import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect, useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <p>{user.displayName}님 환영합니다</p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <button onClick={handleLogin}>구글 로그인</button>
      )}
    </div>
  );
};

export default Login;
