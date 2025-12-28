"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { lang } = useLang();
  const isAr = lang === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  if (!user) return null;

  const avatarLetter =
    user.name?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    "U";

  // تحديد الرابط والنص حسب دور المستخدم
  const getDashboardLink = () => {
    return user.role === 'teacher' ? 'https://school.dentin.cloud/teacher/login' : '/profile';
  };

  const getDashboardText = () => {
    return user.role === 'teacher' 
      ? (isAr ? "لوحة التحكم" : "Dashboard")
      : (isAr ? "الملف الشخصي" : "My Profile");
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      {/* زر البروفايل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          direction: isAr ? "rtl" : "ltr",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "14px"
        }}>
          {avatarLetter}
        </div>

        <span style={{
          fontSize: "14px",
          fontWeight: "500",
          maxWidth: "120px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {user.name || user.email.split("@")[0]}
        </span>

        <i
          className="fi fi-rr-angle-small-down"
          style={{
            fontSize: "12px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "0.3s",
          }}
        />
      </button>

      {/* الدروب داون */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            [isAr ? "left" : "right"]: 0,
            background: "#fff",
            borderRadius: "12px",
            minWidth: "220px",
            boxShadow: "0 10px 30px rgba(0,0,0,.15)",
            zIndex: 9999,
            direction: isAr ? "rtl" : "ltr",
            overflow: "hidden",
            marginTop: "8px"
          }}
        >
          {/* الهيدر */}
          <div style={{
            display: "flex",
            gap: "12px",
            padding: "15px",
            borderBottom: "1px solid #eee",
            background: "#f9fafb",
            alignItems: "center"
          }}>
            <div style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              {avatarLetter}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {user.name || user.email.split("@")[0]}
              </div>
              
              <div style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {user.email}
              </div>
              
              <div style={{
                fontSize: "11px",
                color: user.role === 'teacher' ? "#059669" : "#3b82f6",
                background: user.role === 'teacher' ? "#d1fae5" : "#dbeafe",
                padding: "2px 8px",
                borderRadius: "12px",
                marginTop: "5px",
                display: "inline-block"
              }}>
                {user.role === 'teacher' 
                  ? (isAr ? "بائع" : "Seller") 
                  : (isAr ? "مشتري" : "Buyer")
                }
              </div>
            </div>
          </div>

          {/* رابط الداشبورد/البروفايل */}
          <Link
            href={getDashboardLink()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 15px",
              fontSize: "14px",
              width: "100%",
              cursor: "pointer",
              color: "#333",
              textDecoration: "none",
              borderBottom: "1px solid #f3f4f6",
              transition: "background 0.2s"
            }}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <i className="fi fi-rr-dashboard" style={{ fontSize: "14px", width: "20px" }}></i>
            <span>{getDashboardText()}</span>
          </Link>

          {/* زر تسجيل الخروج */}
          <button 
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 15px",
              fontSize: "14px",
              background: "none",
              border: "none",
              width: "100%",
              cursor: "pointer",
              color: "#ef4444",
              textDecoration: "none",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fef2f2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <i className="fi fi-rr-sign-out-alt" style={{ fontSize: "14px", width: "20px" }}></i>
            <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;