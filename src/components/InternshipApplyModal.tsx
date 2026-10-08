import { useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaGraduationCap } from 'react-icons/fa';
import InternshipForm from './InternshipForm';
import './InternshipInquiryForm.css';

interface InternshipApplyModalProps {
  show: boolean;
  onHide: () => void;
}

const InternshipApplyModal = ({ show, onHide }: InternshipApplyModalProps) => {
  const { isDarkMode } = useSelector((state: any) => state.theme);
  const closeTimer = useRef<number | undefined>(undefined);

  // Let the success message be read, then close on its own
  const handleSuccess = () => {
    closeTimer.current = window.setTimeout(onHide, 5000);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const handleHide = () => {
    window.clearTimeout(closeTimer.current);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleHide}
      size="lg"
      centered
      scrollable
      backdrop="static"
      aria-labelledby="internship-apply-modal-title"
      contentClassName={`apply-modal-content ${isDarkMode ? 'dark' : 'light'}`}
    >
      <Modal.Header closeButton closeVariant={isDarkMode ? 'white' : undefined}>
        <Modal.Title id="internship-apply-modal-title" className="apply-modal-title">
          <span className="apply-badge apply-badge--modal">
            <FaGraduationCap className="me-2" />
            Internship Enquiry
          </span>
          <span className="apply-modal-heading">Apply for the Internship Program</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="apply-card apply-card--modal">
        <InternshipForm onSuccess={handleSuccess} onClose={handleHide} />
      </Modal.Body>
    </Modal>
  );
};

export default InternshipApplyModal;
