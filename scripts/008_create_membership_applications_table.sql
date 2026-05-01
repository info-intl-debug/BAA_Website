-- Create membership_applications table to store all member form submissions
CREATE TABLE IF NOT EXISTS membership_applications (
  id BIGSERIAL PRIMARY KEY,
  
  -- Basic Information
  organization_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'member', 'associate', 'institutional'
  
  -- Form Data (JSON - contains all form fields)
  form_data JSONB NOT NULL,
  
  -- Uploaded Images (stored as base64 data URLs)
  ceo_photo TEXT, -- Base64 encoded image
  company_stamp TEXT, -- Base64 encoded image
  final_company_stamp TEXT, -- Base64 encoded image
  signature TEXT, -- Base64 encoded signature
  
  -- Status Tracking
  status VARCHAR(50) DEFAULT 'submitted', -- 'submitted', 'under-review', 'approved', 'rejected'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Additional fields
  notes TEXT, -- For admin notes
  rejection_reason TEXT, -- If rejected
  approved_by VARCHAR(255), -- Admin who approved
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_membership_applications_email ON membership_applications(email);

-- Create index on status for filtering applications
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON membership_applications(status);

-- Create index on category for filtering by membership type
CREATE INDEX IF NOT EXISTS idx_membership_applications_category ON membership_applications(category);

-- Create index on submitted_at for sorting by date
CREATE INDEX IF NOT EXISTS idx_membership_applications_submitted_at ON membership_applications(submitted_at DESC);

-- Create JSONB index for faster queries on form_data
CREATE INDEX IF NOT EXISTS idx_membership_applications_form_data ON membership_applications USING GIN(form_data);

-- Create a view to get count of applications by status
CREATE OR REPLACE VIEW membership_applications_summary AS
SELECT 
  category,
  status,
  COUNT(*) as count,
  COUNT(CASE WHEN approved_at IS NOT NULL THEN 1 END) as approved_count,
  MAX(submitted_at) as latest_submission
FROM membership_applications
GROUP BY category, status
ORDER BY category, status;

-- Create a view for recent applications
CREATE OR REPLACE VIEW recent_membership_applications AS
SELECT 
  id,
  organization_name,
  email,
  phone,
  category,
  status,
  submitted_at,
  approved_at,
  CASE 
    WHEN status = 'approved' THEN 'APPROVED'
    WHEN status = 'rejected' THEN 'REJECTED'
    WHEN status = 'under-review' THEN 'UNDER REVIEW'
    ELSE 'SUBMITTED'
  END as status_display
FROM membership_applications
ORDER BY submitted_at DESC
LIMIT 50;

-- Comments on table and columns for documentation
COMMENT ON TABLE membership_applications IS 'Stores all membership application submissions with form data and uploaded documents';
COMMENT ON COLUMN membership_applications.form_data IS 'Complete form submission data stored as JSON for flexibility';
COMMENT ON COLUMN membership_applications.ceo_photo IS 'CEO/Representative photo stored as base64 data URL';
COMMENT ON COLUMN membership_applications.company_stamp IS 'Company stamp/seal image stored as base64 data URL';
COMMENT ON COLUMN membership_applications.final_company_stamp IS 'Final company stamp image stored as base64 data URL';
COMMENT ON COLUMN membership_applications.signature IS 'Digital signature stored as base64 data URL';
COMMENT ON COLUMN membership_applications.status IS 'Current status of the application (submitted, under-review, approved, rejected)';
