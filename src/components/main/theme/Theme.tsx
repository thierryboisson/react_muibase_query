import { ReactNode } from "react";

export interface ColorTheme {
    textPrimary: {
        light?: string
        main: string
        dark?: string
    }
    primary: {
        light?: string
        main: string
        dark?: string
    }
    secondary: {
        light?: string
        main:  string,
        dark?:  string
    }
    success: {
        light?: string
        main:  string
    }
    danger: {
        light?: string
        main:  string
    }
    warning: {
        light?: string
        main:  string
    }
    grey: {
      [key: number]: string
    }
}

export const color: ColorTheme = {
    textPrimary: {
        light: "#ebebe8",
        main: "#b8b6b4",
        dark: "#757574"
    },
    primary: {
        main: "#039dfc",
        dark: "#0076bf"
    },
    secondary: {
        main: "#fff700",
        dark: "#c7b120"
    },
    success: {
        main: "#63fc17"
    },
    danger: {
        main: "#fc1717"
    },
    warning: {
        main: "#fca017"
    },
    grey: {
      100: '#E7EBF0',
      200: '#E0E3E7',
      300: '#CDD2D7',
      400: '#B2BAC2',
      500: '#A0AAB4',
      600: '#6F7E8C',
      700: '#3E5060',
      800: '#2D3843',
      900: '#1A2027',
    }
}

const space: number= 5

export const spacing = (coef: number): number => {
    return coef * space
}

const transition_duration = 0.2

const css =`
  body {
    font-family: arial, sans-serif;
    color:${color.textPrimary.dark}
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td {
    text-align: left;
    padding: ${spacing(2)}px;
    border-color: ${color.textPrimary.light};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-style: solid;
  }
  th {
    border-color: ${color.textPrimary.light};
    text-align: left;
    padding: ${spacing(2)}px;
    background-color: ${color.textPrimary.light};
  }
  button {
    color: ${color.textPrimary.dark};
    background-color: ${color.textPrimary.light};
    padding: ${spacing(2)}px;
    border-width: 0px;
    font-size: 16px;
    font-weight: 400;
    min-width: 75px;
    transition: color ${transition_duration}s, background-color ${transition_duration}s;
    margin: ${spacing(2)}px;
  }

  button:hover {
    font-weight: 85;
    background-color: ${color.textPrimary.main};
    color: white;
  }
  .row-selected{
    color: ${color.primary.main};
    font-weight: 80;
  }
  .paper-container {
    background-color: ${color.textPrimary.light};
    padding:${spacing(6)}px;
  }
  .paper {
    padding:${spacing(6)}px;
    border-color: ${color.textPrimary.main};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-style: solid;
    background-color: white
  }
  .modal-container {
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    position: fixed;
    display: flex;
    align-items: center;
  }
  .modal {  
    -webkit-tap-highlight-color: normal;
    background-color: white;
    padding: ${spacing(6)}px;
  }
  .modal-backdrop {
    z-index: 1200;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  }

  .dialog-button-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
  }
  .input-container {
    padding-bottom: ${spacing(2)}px;
  }
  .input-label {
    padding-left: ${spacing(2)}px;
  }
  input {
    font-size: 16px;
    padding: ${spacing(2)}px;
    border-color: ${color.textPrimary.main};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-style: solid;
  }
`;

export interface ThemeProps {
    children: ReactNode
}

const Theme: React.FC<ThemeProps> = ({children}) => {
    return (
        <div>
            <style type="text/css">{css}</style>
        {children}
    </div>
    )
}

export default Theme