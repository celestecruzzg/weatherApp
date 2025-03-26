import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";
import Logo from "../../assets/icons/logo.svg";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  // Validación de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña (mínimo 6 caracteres)
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  // Manejo de cambios en los inputs con validaciones
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      email: validateEmail(e.target.value) ? "" : "Correo inválido",
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,
      password: validatePassword(e.target.value)
        ? ""
        : "La contraseña debe tener al menos 6 caracteres",
    });
  };

  // Enviar formulario con validaciones
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Ingrese un correo válido");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    toast.loading("Iniciando sesión...");

    // Simulación de login (reemplázalo con tu API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular validación de usuario correcto
    const userValid = email === "test@example.com" && password === "123456";
    if (userValid) {
      toast.dismiss();
      toast.success("Responda la pregunta de seguridad para continuar...");
      setIsModalOpen(true); // Abrir modal para pregunta de seguridad
    } else {
      toast.dismiss();
      toast.error("Correo o contraseña incorrectos");
      setLoading(false);
    }
  };

  // Manejo del submit del modal de seguridad
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = "Perro"; // Esta es la respuesta correcta, cámbiala según tu necesidad

    if (securityAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      toast.success("Inicio de sesión exitoso 🎉");
      setIsModalOpen(false); // Cerrar el modal
      navigate("/dashboard"); // Usar navigate para redirigir a /dashboard
    } else {
      toast.error("Respuesta incorrecta. Redirigiendo al login.");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate("/login"); // Redirigir al login con navigate
      }, 2000);
    }
  };

  return (
    <div className="min-w-md mx-auto py-12 px-8 bg-white shadow-md">
      <div className="flex-col justify-items-center space-y-6">
        <img src={Logo} alt="Logo" className="w-38 mx-auto" />
        <h2 className="text-xl font-semibold text-center mb-6 text-[var(--text-black)]">
          ¡Bienvenido de nuevo!
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 px-8">
        {/* Correo */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text-blue)] mb-1">
            CORREO
          </label>
          <div className="relative">
            <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="pl-10 text-sm w-full px-4 py-2 border-b text-[var(--text-black)] focus:outline-none focus:border-[var(--text-blue)]"
              placeholder="example@example.com"
              required
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text-blue)] mb-1">
            CONTRASEÑA
          </label>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="pl-10 text-sm w-full px-4 py-2 border-b text-[var(--text-black)] focus:outline-none focus:border-[var(--text-blue)] pr-10"
              placeholder="************"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Olvidaste tu contraseña */}
        <div className="text-center">
          <a href="#" className="text-xs text-[var(--text-blue)] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón de Iniciar sesión con Spinner */}
        <button
          type="submit"
          className="relative flex items-center justify-center w-full bg-[var(--text-blue)] hover:bg-[var(--text-blue-dark)] text-white py-2 px-4 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50"
          disabled={loading || errors.email !== "" || errors.password !== ""}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      {/* Registro */}
      <div className="mt-4 text-center text-xs text-gray-600">
        <p>
          ¿Aún no tienes cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-[var(--text-blue)] hover:underline font-medium cursor-pointer"
          >
            Regístrate
          </button>
        </p>
      </div>

      {/* Modal de Pregunta de Seguridad */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="w-96 mx-auto p-6 bg-white rounded-xl shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold text-[var(--text-black)] text-center mb-4">
          Pregunta de Seguridad
        </h2>
        <form onSubmit={handleModalSubmit} className="space-y-4">
          <label className="block text-sm text-[var(--text-blue)] font-semibold">
            ¿Cuál es tu animal favorito?
          </label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="w-full p-2 border-b text-[var(--text-black)] focus:outline-none focus:border-[var(--text-blue)]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[var(--text-blue)] hover:bg-[var(--text-blue-dark)] text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Verificar respuesta
          </button>
        </form>
      </Modal>
    </div>
  );
};
