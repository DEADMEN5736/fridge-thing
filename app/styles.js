"use client";

export const colors = {
  primary: '#2ecc71',      // Green
  secondary: '#2c3e50',    // Dark Blue/Gray
  textSecondary: '#7f8c8d',// Gray
  background: '#ffffff',   // White
  offWhite: '#f4f7f6',     // Page Background
  lightBackground: '#f9f9f9', // Input/Card background
  border: '#dddddd',
  lightBorder: '#eeeeee',
  error: '#ff3b30',        // Red for flash/delete
  black: '#121212',        // Manga Filter Box
  blackElevated: '#222222',// Tag buttons
  blackBorder: '#333333',  // Filter Box border
};

export const sharedStyles = {
  pageWrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  leftColumn: {
    flex: "0 0 28%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "6%",
    backgroundColor: colors.background,
    zIndex: 2,
  },
  logoStyle: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: "3rem",
    color: colors.secondary,
    marginBottom: "5px",
    fontWeight: "700"
  },
  subtitleStyle: {
    fontFamily: "'Lexend', sans-serif",
    color: colors.textSecondary,
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    width: "325px",
  },
  labelStyle: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#34495e", // Slight variation of secondary
  },
  inputStyle: {
    fontFamily: "'Lexend', sans-serif",
    padding: "12px",
    width: "100%", 
    borderRadius: "6px",
    color: colors.secondary,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.lightBackground,
    boxSizing: "border-box",
  },
  rightColumn: {
    flex: "1",
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#16171d", // Specific dark background for images
  },
  buttonStyle: (bgColor = colors.primary, custom = {}) => ({
    padding: custom.padding || "12px 30px",
    width: custom.width || "325px",
    backgroundColor: bgColor,
    color: colors.background,
    border: "none",
    borderRadius: custom.borderRadius || "6px",
    cursor: "pointer",
    fontFamily: "'Lexend', sans-serif",
    fontWeight: "bold",
    fontSize: custom.fontSize || "16px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  secondaryBtnStyle: {
    padding: "12px",
    width: "325px",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.secondary,
    cursor: "pointer",
    fontFamily: "'Lexend', sans-serif",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    boxSizing: "border-box",
  },
  dashboardWrapper: {
    backgroundColor: colors.offWhite,
    minHeight: '100vh',
    display: 'flex',
    width: '100vw',
    flexDirection: "column",
  },
  onboardingWrapper: {
    backgroundColor: colors.offWhite,
    minHeight: '100vh',
    width: '100vw',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "200px",
    overflow: 'hidden',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 40px 10px 40px',
    width: '100%',
    flexShrink: 0,
    position: 'relative',
  },
  searchBar: {
    width: '100%',
    maxWidth: '650px',
    padding: '14px 20px',
    borderRadius: '12px',
    border: `1px solid ${colors.lightBorder}`,
    backgroundColor: colors.background,
    fontFamily: "'Lexend', sans-serif",
    fontSize: '1rem',
    outline: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  filterDrawer: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: '-50px',
    right: '-50px',
    backgroundColor: colors.black,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    zIndex: 100,
    border: `1px solid ${colors.blackBorder}`,
    maxHeight: '450px',
    overflowY: 'auto',
  },
  gridWrapper: {
    flex: 1,
    maxWidth: '1500px',
    width: '100%',
    margin: '0 auto',
    padding: '20px 40px 40px 40px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  }
};