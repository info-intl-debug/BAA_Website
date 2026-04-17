"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Download, Upload, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

const membershipFees = {
  member: { joiningFee: 15000, annualFee: 7500 },
  associate: { joiningFee: 8000, annualFee: 4000 },
  institutional: { joiningFee: 15000, annualFee: 7500 },
}

const productCategories = [
  { key: "homeSoftLines", label: "Home Soft Lines" },
  { key: "homeHardGoods", label: "Home Hard Goods" },
  { key: "floorCoverings", label: "Floor Coverings" },
  { key: "apparel", label: "Apparel" },
  { key: "fashionAccessories", label: "Fashion Accessories" },
  { key: "jewellery", label: "Jewellery" },
  { key: "leather", label: "Leather" },
  { key: "sportsGoods", label: "Sports Goods / Toys" },
  { key: "foodAgro", label: "Food / Agro" },
  { key: "hardwareMachinery", label: "Hardware / Machinery" },
  { key: "others", label: "Others" },
]

export function MembershipFormComprehensive({ onClose, selectedTier }: { onClose?: () => void; selectedTier?: string }) {
  const [step, setStep] = useState<"mode" | "online" | "upload">("mode")
  const [formStep, setFormStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(
    selectedTier === "Full Member" ? "member" : selectedTier === "Associate Member" ? "associate" : "member"
  )
  
  const [formData, setFormData] = useState<any>({
    // Member/Associate Basic Details
    organizationName: "",
    yearEstablished: "",
    website: "",
    
    // Member/Associate Contact Person - CEO/Director
    ceoName: "",
    ceoEmail: "",
    ceoMobile: "",
    
    // Member/Associate Alternate Contact
    altContactName: "",
    altContactEmail: "",
    altContactMobile: "",
    
    // Registered Address (Both)
    regAddress1: "",
    regAddress2: "",
    regCity: "",
    regPinCode: "",
    regCountry: "India",
    
    // Mailing Address (Both)
    sameAsReg: true,
    mailAddress1: "",
    mailAddress2: "",
    mailCity: "",
    mailPinCode: "",
    mailCountry: "India",
    
    // Member/Associate Registration Details
    iecNo: "",
    gstin: "",
    panNo: "",
    cinNo: "",
    companyRegNo: "",
    udyamStatus: "",
    
    // Member/Associate Business Details
    natureOfBusiness: "",
    businessConstitution: "",
    exportValue: "",
    
    // Work Profile
    workProfile: [
      { year: "FY 2023-24", buyerAccounts: "", countries: "" },
      { year: "FY 2022-23", buyerAccounts: "", countries: "" },
      { year: "FY 2021-22", buyerAccounts: "", countries: "" },
    ],
    
    // CEO Photo
    ceoPhoto: null as File | null,
    
    // Associations
    associatedWithExporter: "no",
    exporterName: "",
    exporterAddress: "",
    associatedWithBuyingAgency: "no",
    buyingAgencyName: "",
    buyingAgencyAddress: "",
    
    // Product Categories
    productCategories: productCategories.reduce((acc: any, cat) => {
      acc[cat.key] = { selected: false, vendors: "", turnover: "" }
      return acc
    }, {}),
    otherCategoryName: "",
    
    // References
    references: [
      { companyName: "", contactName: "", email: "", phone: "" },
      { companyName: "", contactName: "", email: "", phone: "" },
    ],
    
    // Payment Details
    paymentMode: "cheque",
    chequeNo: "",
    paymentDate: "",
    amount: "",
    bankName: "",
    
    // Communication
    whatsappConsent: false,
    contactName: "",
    contactDesignation: "",
    contactMobile: "",
    contactEmail: "",
    
    // Declaration
    declarationName: "",
    declarationDesignation: "",
    companyStamp: null as File | null,
    declarationDate: "",
    
    // Self Declaration
    selfDeclName: "",
    selfDeclDesignation: "",
    selfDeclCompany: "",
    yearsExperience: "",
    confirmationText: "",
    selfDeclSignature: null as File | null,

    // INSTITUTIONAL SPECIFIC FIELDS
    // Basic Details
    institutionName: "",
    institutionYearEstablished: "",
    
    // Contact Person Details
    ceoDirName: "",
    ceoDirEmail: "",
    ceoDirMobile: "",
    contactPerson1Name: "",
    contactPerson1Email: "",
    contactPerson1Mobile: "",
    
    // Institution Contact Details
    institutionTelephone: "",
    institutionEmail1: "",
    institutionMobile: "",
    institutionEmail2: "",
    institutionFax: "",
    institutionWebsite: "",
    
    // Institution Registration Details
    institutionIec: "",
    institutionGstin: "",
    institutionPan: "",
    institutionCin: "",
    institutionOtherReg: "",
    
    // Nature of Institution (checkboxes)
    natureOfInstitution: {
      exportPromotion: false,
      tradePromotion: false,
      exhibition: false,
      skillCouncil: false,
      others: false,
      othersText: "",
    },
    
    // Major Product (checkboxes)
    majorProduct: {
      handicrafts: false,
      textiles: false,
      garments: false,
      jewellery: false,
      carpets: false,
      leather: false,
      others: false,
      othersText: "",
    },
    
    // Constitution of Business (checkboxes)
    institutionConstitution: {
      limitedCompany: false,
      institution: false,
      government: false,
      governmentAided: false,
      nonProfit: false,
      others: false,
      othersText: "",
    },
    
    // Signature
    applicantSignature: null as File | null,
    
    // Final Details
    finalName: "",
    finalDesignation: "",
    finalCompanyStamp: null as File | null,
    finalDate: "",
    
    // Declaration
    acceptTerms: false,
    acceptCodeOfConduct: false,
  })
  
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null
    setFormData((prev: any) => ({ ...prev, [fieldName]: file }))
  }

  const handleCheckboxChange = (fieldName: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: !prev[fieldName] }))
  }

  const handleProductCategoryChange = (categoryKey: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      productCategories: {
        ...prev.productCategories,
        [categoryKey]: {
          ...prev.productCategories[categoryKey],
          [field]: value,
        },
      },
    }))
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const newReferences = [...formData.references]
    newReferences[index] = { ...newReferences[index], [field]: value }
    setFormData((prev: any) => ({ ...prev, references: newReferences }))
  }

  const handleWorkProfileChange = (index: number, field: string, value: string) => {
    const newProfile = [...formData.workProfile]
    newProfile[index] = { ...newProfile[index], [field]: value }
    setFormData((prev: any) => ({ ...prev, workProfile: newProfile }))
  }

  const handleOnlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.organizationName || !formData.ceoName || !formData.ceoEmail || !formData.ceoMobile) {
      setSubmitStatus("error")
      setSubmitMessage("❌ Please fill in all required contact information")
      return
    }

    if (!formData.regAddress1 || !formData.regCity || !formData.regPinCode || !formData.regCountry) {
      setSubmitStatus("error")
      setSubmitMessage("❌ Please fill in all required address information")
      return
    }

    try {
      setSubmitStatus("idle")
      setSubmitMessage("📧 Sending your application...")

      const response = await fetch("/api/send-membership-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.organizationName,
          email: formData.ceoEmail,
          phone: formData.ceoMobile,
          category: selectedCategory,
          formType: "comprehensive",
          formDataComplete: formData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to send email")
      }

      setSubmitStatus("success")
      setSubmitMessage("✅ Application sent successfully! Check your email for confirmation.")
      
      setTimeout(() => {
        setFormStep(1)
        setSubmitStatus("idle")
        onClose?.()
      }, 2000)
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitStatus("error")
      setSubmitMessage(`❌ ${error instanceof Error ? error.message : "Failed to send application"}`)
    }
  }

  const totalForms = 16
  const memberFormSections = [
    "Category & Basic",
    "Contact Info",
    "Address",
    "Registration",
    "Business",
    "Work Profile",
    "Photo",
    "Associations",
    "Categories",
    "References",
    "Payment",
    "Communication",
    "Declaration",
  ]
  
  const institutionalFormSections = [
    "Category & Basic",
    "Contact Person",
    "Address",
    "Institution Details",
    "Registration",
    "Nature",
    "Products",
    "Constitution",
    "Signature",
    "Membership",
    "Payment",
    "Final Details",
    "Declaration",
  ]

  const formSections = selectedCategory === "institutional" ? institutionalFormSections : memberFormSections

  return (
    <div className="max-w-5xl mx-auto">
      {/* Status Messages */}
      {submitStatus === "success" && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{submitMessage}</AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{submitMessage}</AlertDescription>
        </Alert>
      )}

      {/* STEP 1: Choose Application Mode */}
      {step === "mode" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Choose Your Application Method</h3>
            <p className="text-muted-foreground">Select how you'd like to apply for membership</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Card className="p-6 border-2 border-border hover:border-[#E8520A] transition-colors cursor-pointer" onClick={() => setStep("online")}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">Fill Online Form</h4>
                  <p className="text-sm text-muted-foreground">Complete the comprehensive form here</p>
                </div>
                <ul className="text-sm text-left text-muted-foreground space-y-2 mt-4 w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Complete Details
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Instant Submit
                  </li>
                </ul>
                <Button className="w-full mt-4 rounded-full" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border hover:border-[#E8520A] transition-colors cursor-pointer" onClick={() => setStep("upload")}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">Download & Upload</h4>
                  <p className="text-sm text-muted-foreground">Download form, fill offline, then upload</p>
                </div>
                <ul className="text-sm text-left text-muted-foreground space-y-2 mt-4 w-full">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Time to Review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Keep Copy
                  </li>
                </ul>
                <Button className="w-full mt-4 rounded-full" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* STEP 2: Comprehensive Online Form */}
      {step === "online" && (
        <form onSubmit={handleOnlineSubmit} className="space-y-8">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => { setStep("mode"); setFormStep(1) }}
            className="mb-4"
          >
            ← Back to Options
          </Button>

          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-[#FFF5F0] to-white p-4 rounded-lg border border-[#E8520A]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Section {formStep} of {formSections.length}</span>
              <span className="text-sm text-muted-foreground">{formSections[formStep - 1]}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#E8520A] h-2 rounded-full transition-all"
                style={{ width: `${(formStep / formSections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Section 1: Category & Basic Details */}
          {formStep === 1 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">1. Membership Category & Basic Details</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Membership Category *</Label>
                <RadioGroup value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setFormStep(1) }}>
                  <div className="grid gap-3 md:grid-cols-3">
                    {["member", "associate", "institutional"].map((cat) => (
                      <div key={cat}>
                        <RadioGroupItem value={cat} id={`cat_${cat}`} className="hidden" />
                        <Label
                          htmlFor={`cat_${cat}`}
                          className="block cursor-pointer p-4 rounded-lg border-2 border-border hover:border-[#E8520A] transition-colors"
                          style={selectedCategory === cat ? { backgroundColor: "#FFF5F0", borderColor: "#E8520A" } : {}}
                        >
                          <div className="font-bold text-foreground text-base">
                            {cat === "member" ? "Member" : cat === "associate" ? "Associate Member" : "Institutional Member"}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Registration: ₹{membershipFees[cat as keyof typeof membershipFees].joiningFee.toLocaleString()} | 
                            Annual: ₹{membershipFees[cat as keyof typeof membershipFees].annualFee.toLocaleString()}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {selectedCategory !== "institutional" ? (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Organization Name *</Label>
                  <Input
                    name="organizationName"
                    placeholder="Your organization name"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Name of Institution *</Label>
                  <Input
                    name="institutionName"
                    placeholder="Your institution name"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Year of Establishment *</Label>
                  <Input
                    name={selectedCategory === "institutional" ? "institutionYearEstablished" : "yearEstablished"}
                    type="number"
                    placeholder="e.g., 2015"
                    value={selectedCategory === "institutional" ? formData.institutionYearEstablished : formData.yearEstablished}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {selectedCategory !== "institutional" && (
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Website</Label>
                    <Input
                      name="website"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Section 2: Contact Person Details */}
          {selectedCategory !== "institutional" && formStep === 2 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">2. Contact Person Details</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#E8520A] pl-4">
                  <h4 className="font-semibold text-foreground mb-4">CEO / Director</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Name *</Label>
                      <Input
                        name="ceoName"
                        placeholder="CEO/Director name"
                        value={formData.ceoName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Email *</Label>
                        <Input
                          name="ceoEmail"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.ceoEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Mobile No *</Label>
                        <Input
                          name="ceoMobile"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.ceoMobile}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-foreground mb-4">Alternate Contact Person</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Name</Label>
                      <Input
                        name="altContactName"
                        placeholder="Alternate contact name"
                        value={formData.altContactName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Email</Label>
                        <Input
                          name="altContactEmail"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.altContactEmail}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Mobile No</Label>
                        <Input
                          name="altContactMobile"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.altContactMobile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Section 3: Registered Address */}
          {selectedCategory !== "institutional" && formStep === 3 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">3. Registered Address</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Address Line 1 *</Label>
                <Input
                  name="regAddress1"
                  placeholder="Street address"
                  value={formData.regAddress1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Address Line 2</Label>
                <Input
                  name="regAddress2"
                  placeholder="Apartment, suite, etc."
                  value={formData.regAddress2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">City *</Label>
                  <Input
                    name="regCity"
                    placeholder="City"
                    value={formData.regCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Pin Code *</Label>
                  <Input
                    name="regPinCode"
                    placeholder="Pin Code"
                    value={formData.regPinCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Country *</Label>
                  <Input
                    name="regCountry"
                    placeholder="Country"
                    value={formData.regCountry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Mailing Address */}
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.sameAsReg}
                    onCheckedChange={() => handleCheckboxChange("sameAsReg")}
                  />
                  <Label className="text-sm font-semibold cursor-pointer">Same as Registered Address</Label>
                </div>

                {!formData.sameAsReg && (
                  <div className="space-y-4 mt-6">
                    <h4 className="font-semibold text-foreground">Mailing Address</h4>
                    
                    <div className="space-y-4">
                      <Input
                        name="mailAddress1"
                        placeholder="Street address"
                        value={formData.mailAddress1}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="mailAddress2"
                        placeholder="Apartment, suite, etc."
                        value={formData.mailAddress2}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <Input
                        name="mailCity"
                        placeholder="City"
                        value={formData.mailCity}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="mailPinCode"
                        placeholder="Pin Code"
                        value={formData.mailPinCode}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="mailCountry"
                        placeholder="Country"
                        value={formData.mailCountry}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Section 4: Company Registration Details */}
          {selectedCategory !== "institutional" && formStep === 4 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">4. Company Registration Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">IEC No.</Label>
                  <Input
                    name="iecNo"
                    placeholder="IEC Number"
                    value={formData.iecNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">GSTIN</Label>
                  <Input
                    name="gstin"
                    placeholder="GSTIN"
                    value={formData.gstin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">PAN No.</Label>
                  <Input
                    name="panNo"
                    placeholder="PAN Number"
                    value={formData.panNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">CIN No.</Label>
                  <Input
                    name="cinNo"
                    placeholder="CIN Number"
                    value={formData.cinNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Company Registration No.</Label>
                  <Input
                    name="companyRegNo"
                    placeholder="Registration Number"
                    value={formData.companyRegNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">UDYAM / MSME / Other</Label>
                  <Input
                    name="udyamStatus"
                    placeholder="Status"
                    value={formData.udyamStatus}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Section 5: Business Details */}
          {selectedCategory !== "institutional" && formStep === 5 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">5. Business Details</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Nature of Business *</Label>
                <RadioGroup value={formData.natureOfBusiness} onValueChange={(val) => handleInputChange({ target: { name: "natureOfBusiness", value: val } } as any)}>
                  <div className="grid gap-3">
                    {[
                      { value: "independent", label: "Independent Buying / Sourcing Consultant" },
                      { value: "agency", label: "Buying Agency" },
                      { value: "foreign", label: "Foreign Company" },
                      { value: "liaison", label: "Liaison Office" },
                      { value: "others", label: "Others" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <RadioGroupItem value={option.value} id={`nob_${option.value}`} />
                        <Label htmlFor={`nob_${option.value}`} className="cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Constitution of Business *</Label>
                <RadioGroup value={formData.businessConstitution} onValueChange={(val) => handleInputChange({ target: { name: "businessConstitution", value: val } } as any)}>
                  <div className="grid gap-3">
                    {[
                      { value: "proprietorship", label: "Proprietorship" },
                      { value: "partnership", label: "Partnership" },
                      { value: "pvtltd", label: "Pvt Ltd" },
                      { value: "limited", label: "Limited Company" },
                      { value: "others", label: "Others" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <RadioGroupItem value={option.value} id={`bc_${option.value}`} />
                        <Label htmlFor={`bc_${option.value}`} className="cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Value of Facilitated Export (USD) *</Label>
                <RadioGroup value={formData.exportValue} onValueChange={(val) => handleInputChange({ target: { name: "exportValue", value: val } } as any)}>
                  <div className="grid gap-3">
                    {[
                      { value: "under1m", label: "Under 1 million" },
                      { value: "1to10m", label: "1–10 million" },
                      { value: "10to50m", label: "10–50 million" },
                      { value: "50to100m", label: "50–100 million" },
                      { value: "above100m", label: "100 million +" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <RadioGroupItem value={option.value} id={`ev_${option.value}`} />
                        <Label htmlFor={`ev_${option.value}`} className="cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </Card>
          )}

          {/* Section 6: Work Profile */}
          {selectedCategory !== "institutional" && formStep === 6 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">6. Work Profile</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#FFF5F0]">
                      <th className="border border-gray-200 p-3 text-left font-semibold">Fiscal Year</th>
                      <th className="border border-gray-200 p-3 text-left font-semibold">No. of Overseas Buyer Accounts</th>
                      <th className="border border-gray-200 p-3 text-left font-semibold">Countries of Overseas Buyers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.workProfile.map((profile: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-200 p-3 font-medium">{profile.year}</td>
                        <td className="border border-gray-200 p-3">
                          <Input
                            type="number"
                            placeholder="No. of accounts"
                            value={profile.buyerAccounts}
                            onChange={(e) => handleWorkProfileChange(index, "buyerAccounts", e.target.value)}
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-200 p-3">
                          <Input
                            placeholder="Countries (comma-separated)"
                            value={profile.countries}
                            onChange={(e) => handleWorkProfileChange(index, "countries", e.target.value)}
                            className="w-full"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Section 7: CEO Photo */}
          {selectedCategory !== "institutional" && formStep === 7 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">7. CEO Photo</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Upload Photograph</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: "#E8520A", backgroundColor: "#FFF5F0" }}
                  onClick={() => document.getElementById("ceoPhotoInput")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: "#E8520A" }} />
                  <p className="font-semibold text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">.jpg, .png (Max 5MB)</p>
                </div>
                <input
                  id="ceoPhotoInput"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "ceoPhoto")}
                />
                {formData.ceoPhoto && (
                  <p className="text-sm text-green-600">✓ {formData.ceoPhoto.name} selected</p>
                )}
              </div>
            </Card>
          )}

          {/* Section 8: Associations */}
          {selectedCategory !== "institutional" && formStep === 8 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">8. Associations</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#E8520A] pl-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Associated with exporter/supplier/manufacturer?</h4>
                  <RadioGroup value={formData.associatedWithExporter} onValueChange={(val) => handleInputChange({ target: { name: "associatedWithExporter", value: val } } as any)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="exporter_yes" />
                        <Label htmlFor="exporter_yes" className="cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="exporter_no" />
                        <Label htmlFor="exporter_no" className="cursor-pointer">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {formData.associatedWithExporter === "yes" && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Name *</Label>
                        <Input
                          name="exporterName"
                          placeholder="Name"
                          value={formData.exporterName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Address *</Label>
                        <Textarea
                          name="exporterAddress"
                          placeholder="Address"
                          rows={3}
                          value={formData.exporterAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-l-4 border-[#E8520A] pl-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Associated with other Buying Agency?</h4>
                  <RadioGroup value={formData.associatedWithBuyingAgency} onValueChange={(val) => handleInputChange({ target: { name: "associatedWithBuyingAgency", value: val } } as any)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="agency_yes" />
                        <Label htmlFor="agency_yes" className="cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="agency_no" />
                        <Label htmlFor="agency_no" className="cursor-pointer">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {formData.associatedWithBuyingAgency === "yes" && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Name *</Label>
                        <Input
                          name="buyingAgencyName"
                          placeholder="Name"
                          value={formData.buyingAgencyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Address *</Label>
                        <Textarea
                          name="buyingAgencyAddress"
                          placeholder="Address"
                          rows={3}
                          value={formData.buyingAgencyAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Section 9: Product Categories */}
          {selectedCategory !== "institutional" && formStep === 9 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">9. Product Categories</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#FFF5F0]">
                      <th className="border border-gray-200 p-3 text-left font-semibold">Category</th>
                      <th className="border border-gray-200 p-3 text-center font-semibold">Selected</th>
                      <th className="border border-gray-200 p-3 text-left font-semibold">No. of Vendors</th>
                      <th className="border border-gray-200 p-3 text-left font-semibold">% in Turnover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCategories.map((cat) => (
                      <tr key={cat.key}>
                        <td className="border border-gray-200 p-3 font-medium">{cat.label}</td>
                        <td className="border border-gray-200 p-3 text-center">
                          <Checkbox
                            checked={formData.productCategories[cat.key].selected}
                            onCheckedChange={() =>
                              handleProductCategoryChange(cat.key, "selected", !formData.productCategories[cat.key].selected)
                            }
                          />
                        </td>
                        <td className="border border-gray-200 p-3">
                          <Input
                            type="number"
                            placeholder="0"
                            value={formData.productCategories[cat.key].vendors}
                            onChange={(e) => handleProductCategoryChange(cat.key, "vendors", e.target.value)}
                            className="w-full text-sm"
                            disabled={!formData.productCategories[cat.key].selected}
                          />
                        </td>
                        <td className="border border-gray-200 p-3">
                          <Input
                            type="number"
                            placeholder="0"
                            value={formData.productCategories[cat.key].turnover}
                            onChange={(e) => handleProductCategoryChange(cat.key, "turnover", e.target.value)}
                            className="w-full text-sm"
                            disabled={!formData.productCategories[cat.key].selected}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Section 10: References */}
          {selectedCategory !== "institutional" && formStep === 10 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">10. References</h3>
              
              {formData.references.map((ref: any, index: number) => (
                <div key={index} className="border-l-4 border-[#E8520A] pl-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Reference {index + 1}</h4>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Company Name</Label>
                      <Input
                        placeholder="Company name"
                        value={ref.companyName}
                        onChange={(e) => handleReferenceChange(index, "companyName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Contact Person Name</Label>
                      <Input
                        placeholder="Contact person"
                        value={ref.contactName}
                        onChange={(e) => handleReferenceChange(index, "contactName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Email</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={ref.email}
                        onChange={(e) => handleReferenceChange(index, "email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Contact No</Label>
                      <Input
                        placeholder="+91 XXXXX XXXXX"
                        value={ref.phone}
                        onChange={(e) => handleReferenceChange(index, "phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Section 11: Payment Details */}
          {selectedCategory !== "institutional" && formStep === 11 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">11. Payment Details</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Payment Mode</Label>
                <RadioGroup value={formData.paymentMode} onValueChange={(val) => handleInputChange({ target: { name: "paymentMode", value: val } } as any)}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="cheque" id="payment_cheque" />
                      <Label htmlFor="payment_cheque" className="cursor-pointer">Cheque</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="neft" id="payment_neft" />
                      <Label htmlFor="payment_neft" className="cursor-pointer">NEFT</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">{formData.paymentMode === "cheque" ? "Cheque" : "NEFT"} No.</Label>
                  <Input
                    name="chequeNo"
                    placeholder="Number"
                    value={formData.chequeNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date</Label>
                  <Input
                    name="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Amount</Label>
                  <Input
                    name="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Bank Name</Label>
                  <Input
                    name="bankName"
                    placeholder="Bank name"
                    value={formData.bankName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Section 12: Communication */}
          {selectedCategory !== "institutional" && formStep === 12 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">12. Communication Preferences</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <Checkbox checked={formData.whatsappConsent} onCheckedChange={() => handleCheckboxChange("whatsappConsent")} />
                <Label className="font-semibold cursor-pointer">I consent to join the WhatsApp Group</Label>
              </div>

              {formData.whatsappConsent && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Your Name</Label>
                    <Input
                      name="contactName"
                      placeholder="Name"
                      value={formData.contactName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Designation</Label>
                    <Input
                      name="contactDesignation"
                      placeholder="Designation"
                      value={formData.contactDesignation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mobile</Label>
                    <Input
                      name="contactMobile"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.contactMobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Email</Label>
                    <Input
                      name="contactEmail"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Section 13: Declaration */}
          {selectedCategory !== "institutional" && formStep === 13 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">13. Declaration</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Name</Label>
                  <Input
                    name="declarationName"
                    placeholder="Name"
                    value={formData.declarationName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Designation</Label>
                  <Input
                    name="declarationDesignation"
                    placeholder="Designation"
                    value={formData.declarationDesignation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Company Stamp</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: "#E8520A", backgroundColor: "#FFF5F0" }}
                  onClick={() => document.getElementById("companyStampInput")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: "#E8520A" }} />
                  <p className="font-semibold text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">.jpg, .png (Max 5MB)</p>
                </div>
                <input
                  id="companyStampInput"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "companyStamp")}
                />
                {formData.companyStamp && (
                  <p className="text-sm text-green-600">✓ {formData.companyStamp.name} selected</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Date</Label>
                <Input
                  name="declarationDate"
                  type="date"
                  value={formData.declarationDate}
                  onChange={handleInputChange}
                />
              </div>
            </Card>
          )}

          {/* INSTITUTIONAL MEMBER SECTIONS */}

          {/* Institutional Section 2: Contact Person Details */}
          {selectedCategory === "institutional" && formStep === 2 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">2. Contact Person Details</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#E8520A] pl-4 space-y-4">
                  <h4 className="font-semibold text-foreground">CEO / Director *</h4>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Name *</Label>
                    <Input name="ceoDirName" placeholder="Name" value={formData.ceoDirName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Email *</Label>
                    <Input name="ceoDirEmail" type="email" placeholder="Email" value={formData.ceoDirEmail} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mobile No *</Label>
                    <Input name="ceoDirMobile" placeholder="Mobile" value={formData.ceoDirMobile} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="border-l-4 border-gray-300 pl-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Contact Person</h4>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Name</Label>
                    <Input name="contactPerson1Name" placeholder="Name" value={formData.contactPerson1Name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Email</Label>
                    <Input name="contactPerson1Email" type="email" placeholder="Email" value={formData.contactPerson1Email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mobile No</Label>
                    <Input name="contactPerson1Mobile" placeholder="Mobile" value={formData.contactPerson1Mobile} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Institutional Section 3: Address */}
          {selectedCategory === "institutional" && formStep === 3 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">3. Address</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Address Line 1 *</Label>
                <Input name="regAddress1" placeholder="Street address" value={formData.regAddress1} onChange={handleInputChange} required />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Address Line 2</Label>
                <Input name="regAddress2" placeholder="Apartment, suite, etc." value={formData.regAddress2} onChange={handleInputChange} />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">City *</Label>
                  <Input name="regCity" placeholder="City" value={formData.regCity} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Pin Code *</Label>
                  <Input name="regPinCode" placeholder="Pin Code" value={formData.regPinCode} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Country *</Label>
                  <Input name="regCountry" placeholder="Country" value={formData.regCountry} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={formData.sameAsReg} onCheckedChange={() => handleCheckboxChange("sameAsReg")} />
                  <Label className="text-sm font-semibold cursor-pointer">Same as Registered Address</Label>
                </div>

                {!formData.sameAsReg && (
                  <div className="space-y-4 mt-6">
                    <h4 className="font-semibold text-foreground">Mailing Address</h4>
                    <Input name="mailAddress1" placeholder="Street address" value={formData.mailAddress1} onChange={handleInputChange} />
                    <Input name="mailAddress2" placeholder="Apartment, suite, etc." value={formData.mailAddress2} onChange={handleInputChange} />
                    <div className="grid gap-4 md:grid-cols-3">
                      <Input name="mailCity" placeholder="City" value={formData.mailCity} onChange={handleInputChange} />
                      <Input name="mailPinCode" placeholder="Pin Code" value={formData.mailPinCode} onChange={handleInputChange} />
                      <Input name="mailCountry" placeholder="Country" value={formData.mailCountry} onChange={handleInputChange} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Institutional Section 4: Institution Contact Details */}
          {selectedCategory === "institutional" && formStep === 4 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">4. Institution Contact Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Telephone *</Label>
                  <Input name="institutionTelephone" placeholder="Telephone" value={formData.institutionTelephone} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email 1 *</Label>
                  <Input name="institutionEmail1" type="email" placeholder="Email" value={formData.institutionEmail1} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Mobile *</Label>
                  <Input name="institutionMobile" placeholder="Mobile" value={formData.institutionMobile} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email 2</Label>
                  <Input name="institutionEmail2" type="email" placeholder="Email" value={formData.institutionEmail2} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Fax</Label>
                  <Input name="institutionFax" placeholder="Fax" value={formData.institutionFax} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Website</Label>
                  <Input name="institutionWebsite" type="url" placeholder="Website" value={formData.institutionWebsite} onChange={handleInputChange} />
                </div>
              </div>
            </Card>
          )}

          {/* Institutional Section 5: Registration Details */}
          {selectedCategory === "institutional" && formStep === 5 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">5. Institution Registration Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">IEC No.</Label>
                  <Input name="institutionIec" placeholder="IEC No." value={formData.institutionIec} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">GSTIN *</Label>
                  <Input name="institutionGstin" placeholder="GSTIN" value={formData.institutionGstin} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">PAN No. *</Label>
                  <Input name="institutionPan" placeholder="PAN" value={formData.institutionPan} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">CIN No.</Label>
                  <Input name="institutionCin" placeholder="CIN No." value={formData.institutionCin} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Any Other</Label>
                  <Input name="institutionOtherReg" placeholder="Other details" value={formData.institutionOtherReg} onChange={handleInputChange} />
                </div>
              </div>
            </Card>
          )}

          {/* Institutional Section 6: Nature of Institution */}
          {selectedCategory === "institutional" && formStep === 6 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">6. Nature of Institution</h3>
              
              <div className="space-y-4">
                {[
                  { key: "exportPromotion", label: "Export Promotion Council" },
                  { key: "tradePromotion", label: "Trade Promotion Organization" },
                  { key: "exhibition", label: "Exhibition Services" },
                  { key: "skillCouncil", label: "Sector Skill Council" },
                  { key: "others", label: "Others" },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.natureOfInstitution[item.key as keyof typeof formData.natureOfInstitution]}
                        onCheckedChange={() => {
                          setFormData((prev: any) => ({
                            ...prev,
                            natureOfInstitution: {
                              ...prev.natureOfInstitution,
                              [item.key]: !prev.natureOfInstitution[item.key],
                            },
                          }))
                        }}
                      />
                      <Label className="cursor-pointer font-semibold">{item.label}</Label>
                    </div>
                    {item.key === "others" && formData.natureOfInstitution.others && (
                      <Input
                        placeholder="Please specify"
                        value={formData.natureOfInstitution.othersText}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            natureOfInstitution: { ...prev.natureOfInstitution, othersText: e.target.value },
                          }))
                        }}
                        className="ml-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Institutional Section 7: Major Product */}
          {selectedCategory === "institutional" && formStep === 7 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">7. Major Product Categories</h3>
              
              <div className="space-y-4">
                {[
                  { key: "handicrafts", label: "Handicrafts" },
                  { key: "textiles", label: "Textiles & Furnishing" },
                  { key: "garments", label: "Garments & Accessories" },
                  { key: "jewellery", label: "Jewellery" },
                  { key: "carpets", label: "Carpets" },
                  { key: "leather", label: "Leather" },
                  { key: "others", label: "Others" },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.majorProduct[item.key as keyof typeof formData.majorProduct]}
                        onCheckedChange={() => {
                          setFormData((prev: any) => ({
                            ...prev,
                            majorProduct: {
                              ...prev.majorProduct,
                              [item.key]: !prev.majorProduct[item.key],
                            },
                          }))
                        }}
                      />
                      <Label className="cursor-pointer font-semibold">{item.label}</Label>
                    </div>
                    {item.key === "others" && formData.majorProduct.others && (
                      <Input
                        placeholder="Please specify"
                        value={formData.majorProduct.othersText}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            majorProduct: { ...prev.majorProduct, othersText: e.target.value },
                          }))
                        }}
                        className="ml-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Institutional Section 8: Constitution of Business */}
          {selectedCategory === "institutional" && formStep === 8 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">8. Constitution of Business</h3>
              
              <div className="space-y-4">
                {[
                  { key: "limitedCompany", label: "Limited Company" },
                  { key: "institution", label: "Institution" },
                  { key: "government", label: "Government Organization" },
                  { key: "governmentAided", label: "Government Aided" },
                  { key: "nonProfit", label: "Non-Profit Organization" },
                  { key: "others", label: "Others" },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.institutionConstitution[item.key as keyof typeof formData.institutionConstitution]}
                        onCheckedChange={() => {
                          setFormData((prev: any) => ({
                            ...prev,
                            institutionConstitution: {
                              ...prev.institutionConstitution,
                              [item.key]: !prev.institutionConstitution[item.key],
                            },
                          }))
                        }}
                      />
                      <Label className="cursor-pointer font-semibold">{item.label}</Label>
                    </div>
                    {item.key === "others" && formData.institutionConstitution.others && (
                      <Input
                        placeholder="Please specify"
                        value={formData.institutionConstitution.othersText}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            institutionConstitution: { ...prev.institutionConstitution, othersText: e.target.value },
                          }))
                        }}
                        className="ml-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Institutional Section 9: Signature */}
          {selectedCategory === "institutional" && formStep === 9 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">9. Applicant Signature</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Upload Signature/Draw Signature</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: "#E8520A", backgroundColor: "#FFF5F0" }}
                  onClick={() => document.getElementById("applicantSignInput")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: "#E8520A" }} />
                  <p className="font-semibold text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">.jpg, .png, .pdf (Max 5MB)</p>
                </div>
                <input
                  id="applicantSignInput"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "applicantSignature")}
                />
                {formData.applicantSignature && (
                  <p className="text-sm text-green-600">✓ {formData.applicantSignature.name} selected</p>
                )}
              </div>
            </Card>
          )}

          {/* Institutional Section 10: Membership Details */}
          {selectedCategory === "institutional" && formStep === 10 && (
            <Card className="p-5" style={{ backgroundColor: "#FFF5F0", borderColor: "#E8520A", borderWidth: "2px" }}>
              <h4 className="font-bold text-foreground mb-4">💰 Institutional Member</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Membership Category:</span>
                  <span className="font-bold">Institutional Member</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Fee:</span>
                  <span className="font-bold">₹{membershipFees.institutional.joiningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Subscription Fee:</span>
                  <span className="font-bold">₹{membershipFees.institutional.annualFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#E8520A]/30 pt-2 flex justify-between font-bold">
                  <span>First Year:</span>
                  <span style={{ color: "#E8520A" }}>₹{(membershipFees.institutional.joiningFee + membershipFees.institutional.annualFee).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Institutional Section 11: Payment Details */}
          {selectedCategory === "institutional" && formStep === 11 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">11. Payment Details</h3>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Payment Mode</Label>
                <RadioGroup value={formData.paymentMode} onValueChange={(val) => handleInputChange({ target: { name: "paymentMode", value: val } } as any)}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="cheque" id="inst_payment_cheque" />
                      <Label htmlFor="inst_payment_cheque" className="cursor-pointer">Cheque</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="neft" id="inst_payment_neft" />
                      <Label htmlFor="inst_payment_neft" className="cursor-pointer">NEFT</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">{formData.paymentMode === "cheque" ? "Cheque" : "NEFT"} No.</Label>
                  <Input name="chequeNo" placeholder="Number" value={formData.chequeNo} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date</Label>
                  <Input name="paymentDate" type="date" value={formData.paymentDate} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Amount</Label>
                  <Input name="amount" type="number" placeholder="0" value={formData.amount} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Issuing Bank</Label>
                  <Input name="bankName" placeholder="Bank name" value={formData.bankName} onChange={handleInputChange} />
                </div>
              </div>
            </Card>
          )}

          {/* Institutional Section 12: Final Details */}
          {selectedCategory === "institutional" && formStep === 12 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">12. Final Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Name</Label>
                  <Input name="finalName" placeholder="Name" value={formData.finalName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Designation</Label>
                  <Input name="finalDesignation" placeholder="Designation" value={formData.finalDesignation} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Company Stamp / Seal</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                  style={{ borderColor: "#E8520A", backgroundColor: "#FFF5F0" }}
                  onClick={() => document.getElementById("finalStampInput")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: "#E8520A" }} />
                  <p className="font-semibold text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">.jpg, .png, .pdf (Max 5MB)</p>
                </div>
                <input
                  id="finalStampInput"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "finalCompanyStamp")}
                />
                {formData.finalCompanyStamp && (
                  <p className="text-sm text-green-600">✓ {formData.finalCompanyStamp.name} selected</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Date</Label>
                <Input name="finalDate" type="date" value={formData.finalDate} onChange={handleInputChange} />
              </div>
            </Card>
          )}

          {/* Institutional Section 13: Declaration */}
          {selectedCategory === "institutional" && formStep === 13 && (
            <Card className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">13. Declaration & Consent</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.acceptTerms} onCheckedChange={() => handleCheckboxChange("acceptTerms")} />
                  <Label className="text-sm cursor-pointer">
                    <span className="font-semibold">Information is true and correct</span>
                    <p className="text-muted-foreground">I declare that all information provided above is true and accurate</p>
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox checked={true} disabled={true} />
                  <Label className="text-sm cursor-pointer">
                    <span className="font-semibold">Membership can be cancelled if false</span>
                    <p className="text-muted-foreground">I understand membership will be cancelled if any information is found to be false</p>
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.acceptCodeOfConduct} onCheckedChange={() => handleCheckboxChange("acceptCodeOfConduct")} />
                  <Label className="text-sm cursor-pointer">
                    <span className="font-semibold">Agree to Code of Conduct</span>
                    <p className="text-muted-foreground">I agree to follow the Code of Conduct of BAA</p>
                  </Label>
                </div>
              </div>
            </Card>
          )}

          {/* Form Navigation */}
          <div className="flex gap-3 justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormStep(Math.max(1, formStep - 1))}
              disabled={formStep === 1}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            <div className="text-sm text-muted-foreground">
              Section {formStep} of {formSections.length}
            </div>

            {formStep === formSections.length ? (
              <Button
                type="submit"
                size="lg"
                className="rounded-full font-bold"
                style={{ backgroundColor: "#E8520A", color: "#fff" }}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setFormStep(Math.min(formSections.length, formStep + 1))}
                className="rounded-full"
                style={{ backgroundColor: "#E8520A", color: "#fff" }}
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      )}

      {/* STEP 3: Download & Upload (Same as before) */}
      {step === "upload" && (
        <div className="space-y-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep("mode")}
            className="mb-4"
          >
            ← Back to Options
          </Button>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Download & Fill Offline</h3>
            <p className="text-muted-foreground">Download the form template for your membership type</p>
          </div>

          <div className="text-center space-y-4">
            <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
              <div className="grid gap-3 md:grid-cols-2">
                {["member", "associate"].map((cat) => (
                  <div key={cat}>
                    <RadioGroupItem value={cat} id={`dl_${cat}`} className="hidden" />
                    <Label
                      htmlFor={`dl_${cat}`}
                      className="block cursor-pointer p-4 rounded-lg border-2 border-border hover:border-[#E8520A] transition-colors"
                      style={selectedCategory === cat ? { backgroundColor: "#FFF5F0", borderColor: "#E8520A" } : {}}
                    >
                      <div className="font-bold text-foreground text-base">
                        {cat === "member" ? "Member" : "Associate Member"}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <Card className="p-8 border-2 border-dashed" style={{ borderColor: "#E8520A" }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <Download className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-2">📥 Download Template Form</h4>
                <a
                  href={selectedCategory === "member" 
                    ? "/membership-forms/BAA Membership Application Form 2026 - Members & Associates .pdf"
                    : "/membership-forms/BAA Membership Application Form 2026 - Members & Associates .pdf"}
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-colors mt-4"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  <Download className="h-4 w-4" /> Download Form
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="font-bold text-foreground mb-4">✅ Next Steps</h4>
            <ol className="text-sm space-y-2 text-muted-foreground">
              <li>✅ Download and print the form</li>
              <li>✅ Fill it with complete information</li>
              <li>✅ Attach required documents (ID, PAN, etc.)</li>
              <li>✅ Sign and stamp the form</li>
              <li>✅ Upload it using the upload option below</li>
            </ol>
          </Card>
        </div>
      )}
    </div>
  )
}
