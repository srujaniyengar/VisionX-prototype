import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: {
      // Navigation
      nav_home: "Home",
      nav_report: "New Report",
      nav_map: "Crisis Map",
      nav_tutorial: "How to Use",
      nav_admin: "Admin",

      // Home Page
      homepage_title: "The Chola Citadel",
      homepage_subtitle: "Ocean Hazard & Crisis Reporting Platform",
      homepage_about:
        "Monitor ocean hazards, report environmental crises, and stay informed about coastal threats. Compliant with GIGW/WCAG 2.1 guidelines for accessibility.",
      report_hazard: "Report Hazard",
      report_hazard_desc: "Submit new ocean crisis reports",
      crisis_map: "Crisis Map",
      crisis_map_desc: "View all reported hazards",
      how_to_use: "How to Use",
      how_to_use_desc: "Learn how to use the platform",
      about_platform: "About The Platform",
      about_platform_desc:
        "The Chola Citadel is a comprehensive ocean hazard monitoring and reporting system designed to help coastal communities stay informed about environmental threats. Our platform enables real-time crisis reporting, interactive mapping, and data-driven insights to protect our oceans and coastlines.",

      // Map Page
      map_title: "Crisis Map",
      map_subtitle: "Interactive map showing all reported ocean hazards",
      filter_all: "ALL",
      ocean_debris: "Ocean Debris",
      tsunami_warnings: "Tsunami Warnings",
      cyclone_warnings: "Cyclone Warnings",
      flood_alerts: "Flood Alerts",
      loading_map: "Loading map...",

      // Report Page
      report_title: "Report Ocean Hazard",
      report_subtitle: "Help protect our oceans by reporting environmental hazards",
      hazard_type: "Hazard Type",
      latitude: "Latitude",
      longitude: "Longitude",
      intensity: "Intensity",
      intensity_low: "Low",
      intensity_medium: "Medium",
      intensity_high: "High",
      description: "Description",
      description_placeholder: "Provide detailed information about the hazard...",
      submit_report: "Submit Report",
      report_success: "Report submitted successfully! (Demo mode)",

      // Tutorial Page
      tutorial_title: "How to Use The Chola Citadel",
      tutorial_subtitle: "A comprehensive guide to using our ocean hazard reporting platform",
      tutorial_step1_title: "1. Report a Hazard",
      tutorial_step1_desc:
        "Navigate to the 'New Report' page to submit information about ocean hazards. Select the hazard type, provide coordinates, set the intensity level, and add a detailed description. Your report will help authorities and communities respond to environmental threats.",
      tutorial_step2_title: "2. View Crisis Map",
      tutorial_step2_desc:
        "The Crisis Map displays all reported hazards across the Indian Ocean region. Use the filter buttons to view specific types of hazards. Click on any marker to see detailed information about that report, including the date, description, and intensity level.",
      tutorial_step3_title: "3. Admin Dashboard",
      tutorial_step3_desc:
        "Authorized administrators can access the Analytics Dashboard to view comprehensive statistics, trends, and insights about reported hazards. The dashboard includes interactive charts showing hazard distribution, temporal patterns, and severity analysis.",
      tutorial_step4_title: "4. Multi-Language Support",
      tutorial_step4_desc:
        "The platform supports English, Hindi, and Tamil. Use the language switcher in the top-right corner to change the interface language. This ensures accessibility for diverse coastal communities across India.",
      accessibility_features: "Accessibility Features",
      accessibility_1: "WCAG 2.1 Level AA compliant design with proper color contrast",
      accessibility_2: "Keyboard navigation support for all interactive elements",
      accessibility_3: "Screen reader compatible with proper ARIA labels",
      accessibility_4: "Responsive design that works on all devices and screen sizes",

      // Login Page
      login_title: "Admin Login",
      login_subtitle: "Access the analytics dashboard",
      username: "Username",
      password: "Password",
      sign_in: "Sign In",
      demo_credentials: "Demo credentials:",
      invalid_credentials: "Invalid credentials. Try username: admin, password: admin123",

      // Analytics Page
      analytics_title: "Analytics Dashboard",
      analytics_subtitle: "Comprehensive hazard reporting statistics",
      logout: "Logout",
      total_reports: "Total Reports",
      critical_warnings: "Critical Warnings",
      hazard_distribution: "Hazard Distribution",
      hazard_types: "Hazard Types",
      hazard_trends: "Hazard Trends Over Time",
      recent_reports: "Recent Reports",
      type: "Type",
      location: "Location",
      date: "Date",
      intensity: "Intensity",
    },
  },
  hi: {
    translation: {
      // Navigation
      nav_home: "होम",
      nav_report: "नई रिपोर्ट",
      nav_map: "संकट मानचित्र",
      nav_tutorial: "उपयोग कैसे करें",
      nav_admin: "व्यवस्थापक",

      // Home Page
      homepage_title: "चोल गढ़",
      homepage_subtitle: "महासागर खतरा और संकट रिपोर्टिंग प्लेटफार्म",
      homepage_about:
        "समुद्री खतरों की निगरानी करें, पर्यावरणीय संकटों की रिपोर्ट करें, और तटीय खतरों के बारे में सूचित रहें। पहुंच के लिए GIGW/WCAG 2.1 दिशानिर्देशों के अनुरूप।",
      report_hazard: "खतरे की रिपोर्ट करें",
      report_hazard_desc: "नई समुद्री संकट रिपोर्ट जमा करें",
      crisis_map: "संकट मानचित्र",
      crisis_map_desc: "सभी रिपोर्ट किए गए खतरों को देखें",
      how_to_use: "उपयोग कैसे करें",
      how_to_use_desc: "प्लेटफ़ॉर्म का उपयोग करना सीखें",
      about_platform: "प्लेटफ़ॉर्म के बारे में",
      about_platform_desc:
        "चोल गढ़ एक व्यापक महासागर खतरा निगरानी और रिपोर्टिंग प्रणाली है जो तटीय समुदायों को पर्यावरणीय खतरों के बारे में सूचित रहने में मदद करने के लिए डिज़ाइन की गई है। हमारा प्लेटफ़ॉर्म वास्तविक समय संकट रिपोर्टिंग, इंटरैक्टिव मैपिंग और डेटा-संचालित अंतर्दृष्टि को सक्षम बनाता है।",

      // Map Page
      map_title: "संकट मानचित्र",
      map_subtitle: "सभी रिपोर्ट किए गए समुद्री खतरों को दिखाने वाला इंटरैक्टिव मानचित्र",
      filter_all: "सभी",
      ocean_debris: "समुद्री मलबा",
      tsunami_warnings: "सुनामी चेतावनी",
      cyclone_warnings: "चक्रवात चेतावनी",
      flood_alerts: "बाढ़ अलर्ट",
      loading_map: "मानचित्र लोड हो रहा है...",

      // Report Page
      report_title: "समुद्री खतरे की रिपोर्ट करें",
      report_subtitle: "पर्यावरणीय खतरों की रिपोर्ट करके हमारे महासागरों की रक्षा में मदद करें",
      hazard_type: "खतरे का प्रकार",
      latitude: "अक्षांश",
      longitude: "देशांतर",
      intensity: "तीव्रता",
      intensity_low: "कम",
      intensity_medium: "मध्यम",
      intensity_high: "उच्च",
      description: "विवरण",
      description_placeholder: "खतरे के बारे में विस्तृत जानकारी प्रदान करें...",
      submit_report: "रिपोर्ट जमा करें",
      report_success: "रिपोर्ट सफलतापूर्वक जमा की गई! (डेमो मोड)",

      // Tutorial Page
      tutorial_title: "चोल गढ़ का उपयोग कैसे करें",
      tutorial_subtitle: "हमारे महासागर खतरा रिपोर्टिंग प्लेटफ़ॉर्म का उपयोग करने के लिए एक व्यापक गाइड",
      tutorial_step1_title: "1. खतरे की रिपोर्ट करें",
      tutorial_step1_desc:
        "समुद्री खतरों के बारे में जानकारी जमा करने के लिए 'नई रिपोर्ट' पृष्ठ पर जाएं। खतरे का प्रकार चुनें, निर्देशांक प्रदान करें, तीव्रता स्तर सेट करें, और एक विस्तृत विवरण जोड़ें।",
      tutorial_step2_title: "2. संकट मानचित्र देखें",
      tutorial_step2_desc:
        "संकट मानचित्र भारतीय महासागर क्षेत्र में सभी रिपोर्ट किए गए खतरों को प्रदर्शित करता है। विशिष्ट प्रकार के खतरों को देखने के लिए फ़िल्टर बटन का उपयोग करें।",
      tutorial_step3_title: "3. व्यवस्थापक डैशबोर्ड",
      tutorial_step3_desc:
        "अधिकृत व्यवस्थापक रिपोर्ट किए गए खतरों के बारे में व्यापक आंकड़े, रुझान और अंतर्दृष्टि देखने के लिए एनालिटिक्स डैशबोर्ड तक पहुंच सकते हैं।",
      tutorial_step4_title: "4. बहु-भाषा समर्थन",
      tutorial_step4_desc:
        "प्लेटफ़ॉर्म अंग्रेजी, हिंदी और तमिल का समर्थन करता है। इंटरफ़ेस भाषा बदलने के लिए ऊपरी-दाएं कोने में भाषा स्विचर का उपयोग करें।",
      accessibility_features: "पहुंच सुविधाएँ",
      accessibility_1: "उचित रंग कंट्रास्ट के साथ WCAG 2.1 स्तर AA अनुपालन डिज़ाइन",
      accessibility_2: "सभी इंटरैक्टिव तत्वों के लिए कीबोर्ड नेविगेशन समर्थन",
      accessibility_3: "उचित ARIA लेबल के साथ स्क्रीन रीडर संगत",
      accessibility_4: "सभी उपकरणों और स्क्रीन आकारों पर काम करने वाला उत्तरदायी डिज़ाइन",

      // Login Page
      login_title: "व्यवस्थापक लॉगिन",
      login_subtitle: "एनालिटिक्स डैशबोर्ड तक पहुंचें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      sign_in: "साइन इन करें",
      demo_credentials: "डेमो क्रेडेंशियल:",
      invalid_credentials: "अमान्य क्रेडेंशियल। प्रयास करें उपयोगकर्ता नाम: admin, पासवर्ड: admin123",

      // Analytics Page
      analytics_title: "एनालिटिक्स डैशबोर्ड",
      analytics_subtitle: "व्यापक खतरा रिपोर्टिंग आंकड़े",
      logout: "लॉग आउट",
      total_reports: "कुल रिपोर्ट",
      critical_warnings: "गंभीर चेतावनी",
      hazard_distribution: "खतरा वितरण",
      hazard_types: "खतरे के प्रकार",
      hazard_trends: "समय के साथ खतरे के रुझान",
      recent_reports: "हाल की रिपोर्ट",
      type: "प्रकार",
      location: "स्थान",
      date: "तारीख",
      intensity: "तीव्रता",
    },
  },
  ta: {
    translation: {
      // Navigation
      nav_home: "முகப்பு",
      nav_report: "புதிய அறிக்கை",
      nav_map: "நெருக்கடி வரைபடம்",
      nav_tutorial: "எவ்வாறு பயன்படுத்துவது",
      nav_admin: "நிர்வாகி",

      // Home Page
      homepage_title: "சோழர் கோட்டை",
      homepage_subtitle: "கடல் அபாயம் மற்றும் நெருக்கடி அறிக்கை தளம்",
      homepage_about:
        "கடல் அபாயங்களைக் கண்காணிக்கவும், சுற்றுச்சூழல் நெருக்கடிகளைப் புகாரளிக்கவும், கடலோர அச்சுறுத்தல்கள் குறித்து தகவலறிந்து கொள்ளவும். அணுகலுக்கான GIGW/WCAG 2.1 வழிகாட்டுதல்களுடன் இணக்கமானது.",
      report_hazard: "அபாயத்தை புகாரளிக்கவும்",
      report_hazard_desc: "புதிய கடல் நெருக்கடி அறிக்கைகளை சமர்ப்பிக்கவும்",
      crisis_map: "நெருக்கடி வரைபடம்",
      crisis_map_desc: "அனைத்து புகாரளிக்கப்பட்ட கடல் அபாயங்களையும் காண்க",
      how_to_use: "எவ்வாறு பயன்படுத்துவது",
      how_to_use_desc: "தளத்தை எவ்வாறு பயன்படுத்துவது என்பதை அறியவும்",
      about_platform: "தளத்தைப் பற்றி",
      about_platform_desc:
        "சோழர் கோட்டை என்பது கடலோர சமூகங்கள் சுற்றுச்சூழல் அச்சுறுத்தல்கள் குறித்து தகவலறிந்திருக்க உதவும் வகையில் வடிவமைக்கப்பட்ட ஒரு விரிவான கடல் அபாய கண்காணிப்பு மற்றும் அறிக்கை அமைப்பு ஆகும்.",

      // Map Page
      map_title: "நெருக்கடி வரைபடம்",
      map_subtitle: "அனைத்து புகாரளிக்கப்பட்ட கடல் அபாயங்களையும் காட்டும் ஊடாடும் வரைபடம்",
      filter_all: "அனைத்தும்",
      ocean_debris: "கடல் குப்பைகள்",
      tsunami_warnings: "சுனாமி எச்சரிக்கைகள்",
      cyclone_warnings: "சூறாவளி எச்சரிக்கைகள்",
      flood_alerts: "வெள்ள எச்சரிக்கைகள்",
      loading_map: "வரைபடம் ஏற்றப்படுகிறது...",

      // Report Page
      report_title: "கடல் அபாயத்தை புகாரளிக்கவும்",
      report_subtitle: "சுற்றுச்சூழல் அபாயங்களைப் புகாரளிப்பதன் மூலம் நமது கடல்களைப் பாதுகாக்க உதவவும்",
      hazard_type: "அபாய வகை",
      latitude: "அட்சரேகை",
      longitude: "தீர்க்கரேகை",
      intensity: "தீவிரம்",
      intensity_low: "குறைவு",
      intensity_medium: "நடுத்தர",
      intensity_high: "அதிக",
      description: "விளக்கம்",
      description_placeholder: "அபாயம் பற்றிய விரிவான தகவலை வழங்கவும்...",
      submit_report: "அறிக்கையை சமர்ப்பிக்கவும்",
      report_success: "அறிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! (டெமோ பயன்முறை)",

      // Tutorial Page
      tutorial_title: "சோழர் கோட்டையை எவ்வாறு பயன்படுத்துவது",
      tutorial_subtitle: "எங்கள் கடல் அபாய அறிக்கை தளத்தைப் பயன்படுத்துவதற்கான விரிவான வழிகாட்டி",
      tutorial_step1_title: "1. அபாயத்தை புகாரளிக்கவும்",
      tutorial_step1_desc:
        "கடல் அபாயங்கள் பற்றிய தகவலை சமர்ப்பிக்க 'புதிய அறிக்கை' பக்கத்திற்குச் செல்லவும். அபாய வகையைத் தேர்ந்தெடுக்கவும், ஆயத்தொலைவுகளை வழங்கவும், தீவிர நிலையை அமைக்கவும்.",
      tutorial_step2_title: "2. நெருக்கடி வரைபடத்தைக் காண்க",
      tutorial_step2_desc:
        "நெருக்கடி வரைபடம் இந்திய பெருங்கடல் பகுதி முழுவதும் புகாரளிக்கப்பட்ட அனைத்து அபாயங்களையும் காட்டுகிறது. குறிப்பிட்ட வகை அபாயங்களைக் காண வடிகட்டி பொத்தான்களைப் பயன்படுத்தவும்.",
      tutorial_step3_title: "3. நிர்வாக டாஷ்போர்டு",
      tutorial_step3_desc:
        "அங்கீகரிக்கப்பட்ட நிர்வாகிகள் புகாரளிக்கப்பட்ட அபாயங்கள் பற்றிய விரிவான புள்ளிவிவரங்கள், போக்குகள் மற்றும் நுண்ணறிவுகளைக் காண பகுப்பாய்வு டாஷ்போர்டை அணுகலாம்.",
      tutorial_step4_title: "4. பல மொழி ஆதரவு",
      tutorial_step4_desc:
        "தளம் ஆங்கிலம், இந்தி மற்றும் தமிழ் ஆகியவற்றை ஆதரிக்கிறது. இடைமுக மொழியை மாற்ற மேல்-வலது மூலையில் உள்ள மொழி மாற்றியைப் பயன்படுத்தவும்.",
      accessibility_features: "அணுகல் அம்சங்கள்",
      accessibility_1: "சரியான வண்ண மாறுபாட்டுடன் WCAG 2.1 நிலை AA இணக்க வடிவமைப்பு",
      accessibility_2: "அனைத்து ஊடாடும் கூறுகளுக்கும் விசைப்பலகை வழிசெலுத்தல் ஆதரவு",
      accessibility_3: "சரியான ARIA லேபிள்களுடன் திரை வாசிப்பான் இணக்கமானது",
      accessibility_4: "அனைத்து சாதனங்கள் மற்றும் திரை அளவுகளிலும் செயல்படும் பதிலளிக்கக்கூடிய வடிவமைப்பு",

      // Login Page
      login_title: "நிர்வாக உள்நுழைவு",
      login_subtitle: "பகுப்பாய்வு டாஷ்போர்டை அணுகவும்",
      username: "பயனர்பெயர்",
      password: "கடவுச்சொல்",
      sign_in: "உள்நுழைக",
      demo_credentials: "டெமோ சான்றுகள்:",
      invalid_credentials: "தவறான சான்றுகள். முயற்சிக்கவும் பயனர்பெயர்: admin, கடவுச்சொல்: admin123",

      // Analytics Page
      analytics_title: "பகுப்பாய்வு டாஷ்போர்டு",
      analytics_subtitle: "விரிவான அபாய அறிக்கை புள்ளிவிவரங்கள்",
      logout: "வெளியேறு",
      total_reports: "மொத்த அறிக்கைகள்",
      critical_warnings: "முக்கியமான எச்சரிக்கைகள்",
      hazard_distribution: "அபாய விநியோகம்",
      hazard_types: "அபாய வகைகள்",
      hazard_trends: "காலப்போக்கில் அபாய போக்குகள்",
      recent_reports: "சமீபத்திய அறிக்கைகள்",
      type: "வகை",
      location: "இடம்",
      date: "தேதி",
      intensity: "தீவிரம்",
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
