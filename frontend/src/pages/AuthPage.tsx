import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterFrom';
import Footer from '../components/Footer';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex-col bg-[#F3F8FF] flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
      <div className="absolute bottom-0 w-full py-4 px-16">
        <div className="py-[0.1px] bg-[var(--color-blue)]"></div>
        <Footer/>
      </div>
    </div>
  );
};