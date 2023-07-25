/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      bgColor: "rgb(var(--bg-color))",
      cardColor: "rgb(var(--bg-card))",
      textColor: "rgb(var(--color-text))",
      textSecondaryColor: "rgb(var(--color-text-secondary))",
      borderColor: "rgb(var(--color-border))",
      primary: "rgb(var(--color-primary))",
      secondary: "rgb(var(--color-secondary))",
    },
    screens: {
      tablet: "640px",
      desktop: "1280px",
    },
    fontSize: {
      title: "2.5rem", // 본문 제목
      subTitle: "1.75rem", // 카드 제목
      extra: "1.25rem", // nav, 사이드 바
      body: "1rem", // 본문, 버튼
      caption: "0.875rem", // 본문 부가 설명
      meta: "0.75rem", // 카드 부가 설명
    },
    spacing: {
      0: "0",
      buttonPaddingX: "1rem", // 버튼 X 패딩
      buttonPaddingY: "0.5rem", // 버튼 Y 패딩
      tagPaddingX: "0.5rem", // 태그 X 패딩
      tagPaddingY: "0.25rem", // 태그 Y 패딩
      cardPadding: "2rem", // 카드 패딩
      containerPadding: "1rem", // 컨테이너 패딩
      sectionSpacing: "4rem", // 섹션 간격 e.g. 카드와 카드 사이
      elementSpacing: "1.5rem", // 요소 간격 e.g. 카드 내부 영역 사이
      columnGap: "0.5rem", // 칼럼 간격 e.g. 카드 제목과 내용 사이
      rowGap: "1rem", // 행 간격 e.g. 태그와 태그 사이
    },
    borderRadius: {
      DEFAULT: "0.5rem",
      small: "0.25rem",
      full: "9999px",
    },
    fontWeight: {
      light: 200,
      base: 400,
      bold: 600,
    },
  },
  plugins: [],
};
