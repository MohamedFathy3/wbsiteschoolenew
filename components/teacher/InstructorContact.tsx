// components/teacher/InstructorContact.tsx
import Image from "next/image";

interface InstructorContactProps {
  email: string;
  phone: string;
  getText: (key: string) => string;
}

const InstructorContact = ({ email, phone, getText }: InstructorContactProps) => {
  return (
    <div className="contact-info-wrapper">
      {/* الهاتف */}
      <div className="contact-info-item">
        <div className="contact-info-icon">
          <Image
            width={28}
            height={28}
            src="/assets/images/icons/icon-phone-blue.svg"
            alt="phone"
          />
        </div>
        <div className="contact-info-content">
          <span className="contact-label">{getText('support247')}</span>
          <a href={`tel:${phone}`} className="contact-value">
            {phone}
          </a>
        </div>
      </div>
      
      {/* الإيميل */}
      <div className="contact-info-item">
        <div className="contact-info-icon">
          <Image
            width={28}
            height={28}
            src="/assets/images/icons/icon-envelope-blue.svg"
            alt="email"
          />
        </div>
        <div className="contact-info-content">
          <span className="contact-label">{getText('sendMessage')}</span>
          <a href={`mailto:${email}`} className="contact-value email">
            {email}
          </a>
        </div>
      </div>

      <style jsx>{`
        .contact-info-wrapper {
          margin-top: 20px;
        }
        
        .contact-info-item {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s;
        }
        
        .contact-info-item:hover {
          background: #e2e8f0;
          transform: translateX(5px);
        }
        
        .contact-info-icon {
          flex-shrink: 0;
        }
        
        .contact-label {
          font-size: 12px;
          color: #64748b;
          display: block;
          margin-bottom: 5px;
        }
        
        .contact-value {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          text-decoration: none;
          display: block;
        }
        
        .contact-value.email {
          word-break: break-all;
        }
        
        .contact-value:hover {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default InstructorContact;