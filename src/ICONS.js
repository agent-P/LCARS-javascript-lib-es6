const POWER_BUTTON_SVG = "M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z";

const NETWORK_CONNECTION = "M12 0c-4.971 0-9 4.03-9 9s4.029 9 9 9 9-4.03 9-9-4.029-9-9-9zm4.298 15.137c-.079-.395-.177-.784-.299-1.166.673-.608.646-1.648-.054-2.162.436-1.739.458-3.636-.002-5.465.139-.083.261-.191.355-.319 1.101.309 2.124.8 3.04 1.434.105.497.162 1.012.162 1.541 0 2.537-1.269 4.779-3.202 6.137zm-11.798-6.137c0-.642.09-1.261.242-1.856.523-.033 1.044-.03 1.61.024l.03.169c-.691.581-1.312 1.246-1.864 2.005l-.018-.342zm2.387-.893c.636.482 1.562.327 1.997-.368 2.174.795 4.004 2.308 5.205 4.25-.575.581-.567 1.498.014 2.021-.511.923-1.161 1.758-1.919 2.48-3.678.087-6.693-2.446-7.477-5.773.578-.986 1.315-1.869 2.18-2.61zm2.165-1.425c1.493-.73 3.116-1.074 4.743-1.033.229.458.697.807 1.249.875h.005c.417 1.618.437 3.354.021 5.025l-.167.017c-1.294-2.119-3.325-3.849-5.823-4.726l-.028-.158zm4.546 9.643c.527-.613.983-1.271 1.36-1.971l.203-.006c.129.421.229.854.306 1.297-.582.305-1.209.536-1.869.68zm5.328-10.199c-.758-.42-1.557-.752-2.393-.983-.081-.746-.78-1.368-1.589-1.362-.415-.764-.924-1.481-1.517-2.141 2.49.482 4.546 2.197 5.499 4.486zm-4.855-2.031c-.192.165-.333.386-.393.644-1.842-.022-3.585.395-5.137 1.174-.637-.479-1.551-.316-1.982.361-.547-.056-1.036-.068-1.518-.053 1.106-2.763 3.806-4.721 6.959-4.721h.001c.822.745 1.525 1.62 2.07 2.595zm-6.071 19.905v-2h3v-2h2v2h3v2h-8zm9-2v2h3v-2h-3zm-10 0h-3v2h3v-2z";

const NETWORK_CONNECTION_NEGATIVE = "M14.741 12.48c-.567.554-.552 1.452.029 1.953-.69 1.35-1.62 2.558-2.732 3.567-4.359.029-8.103-3.103-8.889-7.354.794-1.334 1.831-2.508 3.048-3.46.547.37 1.299.265 1.75-.246 2.877.968 5.286 2.96 6.794 5.54zm-11.331-6.175c-.272.868-.41 1.771-.41 2.696l.003.26c.752-1.049 1.647-1.985 2.682-2.791l-.016-.063c-.774-.106-1.514-.136-2.259-.102zm17.26.274c-1.103-.723-2.324-1.276-3.632-1.622-.104.193-.265.35-.463.458.587 2.266.571 4.675-.054 6.936.644.495.675 1.455.059 2.026.229.661.404 1.341.525 2.035 2.53-1.746 3.895-4.551 3.895-7.416 0-.809-.108-1.622-.33-2.417zm-6.25-2.022c-2.139-.097-4.242.353-6.14 1.308l.009.261c3.156 1.074 5.695 3.279 7.246 5.966l.149-.011c.585-2.126.593-4.384.021-6.517-.601-.082-1.1-.496-1.285-1.007zm1.253-1.592c.687.033 1.281.509 1.452 1.107 1.069.269 2.098.669 3.064 1.192-1.169-2.559-3.502-4.474-6.32-5.07.721.854 1.324 1.784 1.804 2.771zm-11.933 2.456c.676-.012 1.34.023 2.035.117.393-.805 1.44-1.031 2.091-.451 2.075-1.047 4.338-1.5 6.564-1.404.08-.191.212-.352.38-.474-.596-1.185-1.376-2.262-2.301-3.194l-.514-.015c-3.677 0-6.864 2.216-8.255 5.421zm11.86 9.328c-.57 1.135-1.307 2.193-2.197 3.143 1.035-.162 2.012-.5 2.897-.983-.111-.746-.288-1.47-.525-2.167l-.175.007zm-7.6 9.251v-2h3v-2h2v2h3v2h-8zm9-2v2h3v-2h-3zm-10 0h-3v2h3v-2z";

const BATTERY_HALF = "M19 8v8h-5.952l-5.087-8h11.039zm2-2h-21v12h21v-12zm1 9h.75c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-.75v6z";

const BATTERY_FULL = "M21 6h-21v12h21v-12zm1 9h.75c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-.75v6z";

const BATTERY_EMPTY = "M19 8v8h-17v-8h17zm2-2h-21v12h21v-12zm1 9h.75c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-.75v6z";

const BATTERY_ON_AC = "M0 18h21v-12h-21v12zm5-7h2.998c1.384 0 .965-2 6.002-2v1h1.499c.277 0 .501.224.501.5s-.224.5-.501.5h-1.499v2h1.499c.277 0 .501.224.501.5s-.224.5-.501.5h-1.499v1c-5 0-4.627-2-6-2h-3v-2zm19-.75v3.5c0 .69-.56 1.25-1.25 1.25h-.75v-6h.75c.69 0 1.25.56 1.25 1.25z";

const WEATHER_PARTLY_CLOUDY_DAY = "M2.396 12h-2.396v-2h2.396v2zm7.604-6.458v-3.542h-2v3.542h2zm-4.793.876l-2.156-2.156-1.414 1.414 2.156 2.156 1.414-1.414zm9.461-2.396l-2.115 2.114 1.414 1.414 2.115-2.114-1.414-1.414zm-11.7 10.907l-2.198 1.919 1.303 1.517 2.198-1.919-1.303-1.517zm21.032 2.793c0 2.362-1.95 4.278-4.354 4.278h-10.292c-2.404 0-4.354-1.916-4.354-4.278 0-.77.211-1.49.574-2.113-.964-.907-1.574-2.18-1.574-3.609 0-2.762 2.238-5 5-5 1.329 0 2.523.528 3.414 1.376.649-.24 1.35-.376 2.086-.376 3.171 0 5.753 2.443 5.921 5.516 2.034.359 3.579 2.105 3.579 4.206zm-18-5.722c0 .86.37 1.628.955 2.172.485-.316 1.029-.551 1.624-.656.088-1.61.843-3.042 1.994-4.046-.46-.288-.991-.47-1.573-.47-1.654 0-3 1.346-3 3zm16 5.722c0-2.076-1.979-2.618-3.489-2.512.218-1.439-.24-5.21-4.011-5.21-3.875 0-4.062 3.854-4.011 5.209-1.385-.084-3.489.395-3.489 2.513 0 1.256 1.056 2.278 2.354 2.278h10.291c1.299 0 2.355-1.022 2.355-2.278z";

const WEATHER_PARTLY_CLOUDY_NIGHT = "M20.422 11.516c-.169-3.073-2.75-5.516-5.922-5.516-1.229 0-2.368.37-3.313.999-1.041-1.79-2.974-2.999-5.19-2.999-.468 0-.947.054-1.434.167 1.347 3.833-.383 6.416-4.563 5.812-.006 3.027 2.197 5.468 5.02 5.935.104 2.271 1.996 4.086 4.334 4.086h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.016 2.439c-1.285-.192-2.384-.997-2.964-2.125 2.916-.119 5.063-2.846 4.451-5.729 1.259.29 2.282 1.18 2.778 2.346-.635.875-1.031 1.928-1.094 3.069-1.419.251-2.588 1.186-3.171 2.439zm14.24 4.045h-10.292c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.256-1.057 2.278-2.354 2.278z";

const WEATHER_CLEAR_DAY = "M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z";

const WEATHER_CLEAR_NIGHT = "M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6-8.272c.522.658 1.118 1.253 1.775 1.775-.657.522-1.252 1.117-1.773 1.774-.522-.658-1.118-1.253-1.776-1.776.658-.521 1.252-1.116 1.774-1.773zm-.001-4.228c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z";

const WEATHER_CLEAR_MOON_NIGHT = "M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z";

const WEATHER_RAIN = "M20.422 7.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484zm14.618 2h-10.291c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.256-1.057 2.278-2.355 2.278zm-12.776 6.713l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.3 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm8.253-3.287l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.3 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm8.175-3.287l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.301 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29z";

const WEATHER_RAIN_HEAVY = "M20.422 8.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484zm14.618 2h-10.291c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.256-1.057 2.278-2.355 2.278zm-14.063 8l-1.41-1.41 3.59-3.59 1.41 1.41-3.59 3.59zm8.543-3.59l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59zm4.875 0l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59z";

const WEATHER_RAIN_LIGHT = "M20.422 7.516c-.178-3.232-3.031-5.777-6.432-5.491-1.087-1.24-2.693-2.025-4.49-2.025-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209.967 0 1.714.25 2.29.645-1.823.921-3.096 2.745-3.212 4.871-2.022.357-3.697 2.127-3.551 4.484zm14.618 2h-10.291c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.257-1.057 2.278-2.355 2.278zm-14.291 6.933l1.59-1.59.706.707-1.59 1.59-.706-.707zm4.714.699l1.59-1.591-.707-.707-1.59 1.591.707.707zm-2.418-2.996l.707.707 1.635-1.636-.707-.707-1.635 1.636zm-3.004 3.004l-1.646 1.645.707.707 1.646-1.646-.707-.706zm9.425.011l1.591-1.591-.707-.707-1.591 1.591.707.707zm-5.417-.019l-1.654 1.653.707.707 1.654-1.653-.707-.707zm7.008-2.986l.707.707 1.639-1.639-.707-.707-1.639 1.639zm-3.004 3.005l-1.643 1.642.708.707 1.642-1.642-.707-.707z";

const WEATHER_RAIN_CHANCE_DAY = "M2.396 9h-2.396v-2h2.396v2zm7.604-6.458v-2.542h-2v2.542h2zm-4.793.876l-1.859-1.859-1.414 1.414 1.859 1.859 1.414-1.414zm9.222-2.156l-1.875 1.875 1.414 1.414 1.875-1.875-1.414-1.414zm-11.46 10.667l-2.053 1.773 1.303 1.517 2.053-1.773-1.303-1.517zm21.031 2.793c0 2.362-1.949 4.278-4.354 4.278h-10.292c-2.405 0-4.354-1.916-4.354-4.278 0-.77.211-1.49.574-2.113-.965-.907-1.574-2.18-1.574-3.609 0-2.762 2.238-5 5-5 1.328 0 2.523.528 3.414 1.376.648-.24 1.35-.376 2.086-.376 3.172 0 5.753 2.443 5.922 5.516 2.033.359 3.578 2.105 3.578 4.206zm-18-5.722c0 .86.37 1.628.955 2.172.484-.316 1.029-.551 1.623-.656.089-1.61.844-3.042 1.994-4.046-.459-.288-.99-.47-1.572-.47-1.654 0-3 1.346-3 3zm16 5.722c0-2.076-1.979-2.618-3.488-2.512.217-1.439-.241-5.21-4.012-5.21-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.256 1.057 2.278 2.354 2.278h10.291c1.298 0 2.355-1.022 2.355-2.278zm-15.58 9.278l-1.41-1.41 2.59-2.59 1.41 1.41-2.59 2.59zm7.543-2.59l-1.41-1.41-2.59 2.59 1.41 1.41 2.59-2.59zm4.875 0l-1.41-1.41-2.59 2.59 1.41 1.41 2.59-2.59z";

const WEATHER_RAIN_CHANCE_NIGHT = "M6.869 20.713l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.3 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm8.253-3.287l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.3 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm8.175-3.287l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.301 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm7.026-16.484c-.168-3.073-2.75-5.516-5.922-5.516-1.229 0-2.367.37-3.312.999-1.042-1.79-2.975-2.999-5.19-2.999-.469 0-.947.054-1.434.167 1.346 3.833-.384 6.416-4.564 5.812-.006 3.027 2.197 5.468 5.02 5.935.105 2.271 1.996 4.086 4.335 4.086h10.291c2.405 0 4.354-1.916 4.354-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.016 2.439c-1.285-.192-2.383-.997-2.963-2.125 2.916-.12 5.063-2.846 4.452-5.729 1.258.29 2.281 1.18 2.777 2.346-.635.875-1.031 1.928-1.094 3.069-1.42.251-2.588 1.186-3.172 2.439zm14.24 4.045h-10.291c-1.298 0-2.355-1.022-2.355-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.256-1.057 2.278-2.354 2.278z";

const WEATHER_HEAT_WARNING = "M21.192 4.221l-2.881 2.881c-.411-.528-.886-1.003-1.414-1.414l2.881-2.881 1.414 1.414zm-8.192-.152v-4.069h-2v4.069c.328-.041.66-.069 1-.069s.672.028 1 .069zm6.931 6.931c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-1.931 1c0 .341-.035.674-.09 1h-11.82c-.055-.326-.09-.659-.09-1 0-3.314 2.686-6 6-6s6 2.686 6 6zm-2.142-1c-.448-1.72-2.001-3-3.858-3-1.858 0-3.41 1.28-3.857 3h7.715zm-8.754-5.312l-2.881-2.881-1.415 1.414 2.881 2.881c.411-.529.885-1.003 1.415-1.414zm-7.104 5.312v2h4.069c-.041-.328-.069-.661-.069-1s.028-.672.069-1h-4.069zm9.062 11.667c-1.205-1.195-1.364-1.893-.312-3.26.37-.481.529-.942.529-1.4 0-.959-.699-1.906-1.622-3.006l-1.448 1.379c1.375 1.6 1.246 1.772.26 3.184-.316.453-.446.908-.446 1.355 0 1.159.876 2.259 1.665 3.082l1.374-1.334zm8.688 0c-1.205-1.195-1.364-1.893-.312-3.26.37-.481.529-.942.529-1.4 0-.959-.699-1.906-1.622-3.006l-1.448 1.379c1.375 1.6 1.246 1.772.26 3.184-.316.453-.446.908-.446 1.355 0 1.159.876 2.259 1.665 3.082l1.374-1.334zm-4.396 0c-1.205-1.195-1.364-1.893-.312-3.26.37-.481.529-.942.529-1.4 0-.959-.699-1.906-1.622-3.006l-1.448 1.379c1.375 1.6 1.246 1.772.26 3.184-.316.453-.446.908-.446 1.355 0 1.159.876 2.259 1.665 3.082l1.374-1.334z";

const WEATHER_SNOW = "M14 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm8.75-1.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-6.25-1.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm18.75-7.778c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.871-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.127 3.55-4.484zm13.422 4.206c0-2.075-1.979-2.618-3.488-2.513.217-1.438-.241-5.209-4.012-5.209-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h10.291c1.298 0 2.355-1.021 2.355-2.278zm-5.521-3.97l-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869 1.499-.881-.521-.867z";

const WEATHER_SNOW_HEAVY = "M21.75 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm2 2.5c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.094 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm3.906 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.25-9.028c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.871-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.127 3.55-4.484zm13.422 4.206c0-2.075-1.979-2.618-3.488-2.513.217-1.438-.241-5.209-4.012-5.209-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h10.291c1.298 0 2.355-1.021 2.355-2.278zm-5.521-3.97l-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869 1.499-.881-.521-.867z";

const WEATHER_SNOW_CHANCE_DAY = "M 2.396,9 0,9 0,7 l 2.396,0 0,2 z M 10,2.542 10,0 8,0 l 0,2.542 2,0 z M 5.207,3.418 3.348,1.559 1.934,2.973 3.793,4.832 5.207,3.418 Z M 14.429,1.262 12.554,3.137 13.968,4.551 15.843,2.676 14.429,1.262 Z M 2.969,11.929 0.916,13.702 2.219,15.219 4.272,13.446 2.969,11.929 Z M 24,14.722 C 24,17.084 22.051,19 19.646,19 L 9.354,19 C 6.949,19 5,17.084 5,14.722 5,13.952 5.211,13.232 5.574,12.609 4.609,11.702 4,10.429 4,9 4,6.238 6.238,4 9,4 10.328,4 11.523,4.528 12.414,5.376 13.062,5.136 13.764,5 14.5,5 17.672,5 20.253,7.443 20.422,10.516 22.455,10.875 24,12.621 24,14.722 Z M 6,9 C 6,9.86 6.37,10.628 6.955,11.172 7.439,10.856 7.984,10.621 8.578,10.516 8.667,8.906 9.422,7.474 10.572,6.47 10.113,6.182 9.582,6 9,6 7.346,6 6,7.346 6,9 Z m 16,5.722 C 22,12.646 20.021,12.104 18.512,12.21 18.729,10.771 18.271,7 14.5,7 10.625,7 10.438,10.854 10.488,12.209 9.104,12.125 7,12.604 7,14.722 7,15.978 8.057,17 9.354,17 l 10.291,0 C 20.943,17 22,15.978 22,14.722 Z M 16.479,10.752 15,11.633 15,10 14,10 14,11.633 12.506,10.737 12,11.604 13.499,12.5 12,13.365 12.537,14.232 14,13.367 14,15 l 1,0 0,-1.633 1.467,0.869 L 17,13.369 15.501,12.5 17,11.619 16.479,10.752 Z m 5.104,10.25 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m 2,2.5 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m 4.094,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m 3.906,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z";

const WEATHER_SNOW_CHANCE_NIGHT = "M 20.422,8.516 C 20.253,5.443 17.672,3 14.5,3 13.271,3 12.132,3.37 11.187,3.999 10.146,2.209 8.213,1 5.997,1 5.529,1 5.05,1.054 4.563,1.167 5.91,5 4.18,7.584 0,6.979 -0.006,10.006 2.197,12.448 5.02,12.914 5.124,15.186 7.016,17 9.354,17 l 10.291,0 C 22.051,17 24,15.084 24,12.722 24,10.621 22.455,8.875 20.422,8.516 Z M 5.406,10.955 C 4.121,10.763 3.022,9.957 2.442,8.83 5.358,8.711 7.505,5.984 6.893,3.101 8.152,3.39 9.175,4.281 9.671,5.447 9.037,6.322 8.641,7.375 8.578,8.516 7.158,8.768 5.989,9.702 5.406,10.955 Z M 19.646,15 9.354,15 C 8.057,15 7,13.979 7,12.722 7,10.604 9.104,10.125 10.488,10.209 10.438,8.854 10.625,5 14.5,5 18.271,5 18.729,8.771 18.512,10.209 20.021,10.104 22,10.646 22,12.722 22,13.979 20.943,15 19.646,15 Z m 2.104,4.25 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m -4,0 C 9.75,19.939 9.191,20.5 8.5,20.5 7.809,20.5 7.25,19.939 7.25,19.25 7.25,18.561 7.809,18 8.5,18 c 0.691,0 1.25,0.561 1.25,1.25 z m 2,2.5 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m 4.094,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z m 3.906,0 c 0,0.689 -0.559,1.25 -1.25,1.25 -0.691,0 -1.25,-0.561 -1.25,-1.25 0,-0.689 0.559,-1.25 1.25,-1.25 0.691,0 1.25,0.561 1.25,1.25 z M 16.229,8.78 14.75,9.661 l 0,-1.633 -1,0 0,1.633 -1.494,-0.896 -0.506,0.867 1.499,0.896 -1.499,0.865 0.537,0.867 1.463,-0.865 0,1.633 1,0 0,-1.633 1.467,0.869 L 16.75,11.397 15.251,10.528 16.75,9.647 16.229,8.78 Z";

const WEATHER_SNOW_RAIN = "M9.125 19.41l-3.59 3.59-1.41-1.41 3.59-3.59 1.41 1.41zm1.125 1.09c-.691 0-1.25.56-1.25 1.25s.559 1.25 1.25 1.25 1.25-.56 1.25-1.25-.559-1.25-1.25-1.25zm13.75-7.778c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.846 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.258 6.432 5.492 2.033.359 3.578 2.105 3.578 4.206zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.872-.576-.394-1.323-.644-2.29-.644-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.256 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.126 3.55-4.484zm13.422 4.206c0-2.076-1.979-2.618-3.488-2.512.217-1.439-.241-5.21-4.012-5.21-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.256 1.057 2.278 2.354 2.278h10.291c1.298 0 2.355-1.022 2.355-2.278zm-9.25 5.278c-.691 0-1.25.56-1.25 1.25s.559 1.25 1.25 1.25 1.25-.56 1.25-1.25-.559-1.25-1.25-1.25zm1.25 3.59l1.41 1.41 3.59-3.59-1.41-1.41-3.59 3.59zm2.479-12.838l-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869 1.499-.88-.521-.868z";

const WEATHER_SNOW_BLOWING = "M11 11h-11v-2h11c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-16.764-8.345c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm0 17.5c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm7.75 0c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm10 0c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-14-1.75c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm16.75-1.75c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-17.75-11.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm3-2.75c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm13.75 0c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-3.75 1.75c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-4-1.75c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25z";

const WEATHER_HAIL = "M20.422 7.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484zm14.618 2h-10.291c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.256-1.057 2.278-2.355 2.278zm-4.645 8.5c0 .828-.67 1.5-1.5 1.5s-1.5-.672-1.5-1.5.67-1.5 1.5-1.5 1.5.672 1.5 1.5zm1.199-1.287l2.801-4.197-.016-.016-4.176 2.813c.608.298 1.098.79 1.391 1.4zm-6.199 1.287c0 .828-.67 1.5-1.5 1.5s-1.5-.672-1.5-1.5.67-1.5 1.5-1.5 1.5.672 1.5 1.5zm1.199-1.287l2.801-4.197-.016-.016-4.176 2.813c.608.298 1.098.79 1.391 1.4zm-6.199 1.287c0 .828-.67 1.5-1.5 1.5s-1.5-.672-1.5-1.5.67-1.5 1.5-1.5 1.5.672 1.5 1.5zm1.199-1.287l2.801-4.197-.016-.016-4.176 2.813c.608.298 1.098.79 1.391 1.4z"

const WEATHER_WIND = "M11 10h-11v-2h11c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728z";

const WEATHER_WIND_BREEZY = "M11 10h-5v-2h5c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-7v2h7c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-8.5v2h8.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-9.014 1.655h-8v2h8v-2zm-4 3h-6v2h6v-2zm-2-6h-4v2h4v-2z";

const WEATHER_WIND_CLOUDY = "M18 20c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-11.014-9.345c3.213 0 3.367 3.293 3.185 4.281.977-.036 2.815.22 2.815 2.052 0 1.004-.869 1.667-1.854 1.667h-8.312c-.985 0-1.834-.663-1.834-1.667 0-1.818 1.779-2.116 2.815-2.052-.08-.901-.134-4.281 3.185-4.281zm0-2c-2.671 0-4.845 2.093-4.986 4.729-1.713.307-3.014 1.803-3.014 3.604 0 2.024 1.642 3.667 3.667 3.667h8.666c2.025 0 3.667-1.643 3.667-3.667 0-1.801-1.301-3.297-3.014-3.604-.141-2.636-2.315-4.729-4.986-4.729z";

const WEATHER_SUN_SET = "M4.069 17c-.041.328-.069.661-.069 1s.028.672.069 1h-4.069v-2h4.069zm8.931-16h-2v5h-3l4 4 4-4h-3v-5zm-5.897 10.688l-2.88-2.881-1.415 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm12.828 5.312c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-1.931 1c0 .341-.035.674-.09 1h-11.82c-.055-.326-.09-.659-.09-1 0-3.314 2.685-6 6-6 3.314 0 6 2.686 6 6zm-2.142-1c-.448-1.72-2.001-3-3.858-3-1.858 0-3.41 1.28-3.857 3h7.715zm3.92-8.193l-2.881 2.881c.528.411 1.003.886 1.414 1.414l2.881-2.881-1.414-1.414zm4.222 12.193h-24v2h24v-2z";

const WEATHER_SUN_RISE = "M4.069 17c-.041.328-.069.661-.069 1s.028.672.069 1h-4.069v-2h4.069zm6.931-7h2v-5h3l-4-4-4 4h3v5zm-3.897 1.688l-2.88-2.881-1.415 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm12.828 5.312c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-1.931 1c0 .341-.035.674-.09 1h-11.82c-.055-.326-.09-.659-.09-1 0-3.314 2.686-6 6-6s6 2.686 6 6zm-2.142-1c-.448-1.72-2.001-3-3.858-3-1.858 0-3.41 1.28-3.857 3h7.715zm3.92-8.193l-2.881 2.881c.528.411 1.003.886 1.414 1.414l2.881-2.881-1.414-1.414zm4.222 12.193h-24v2h24v-2z";

const WEATHER_MOON_SET = "M24 24h-24v-2h24v2zm-13-19h-3l4 4 4-4h-3v-5h-2v5zm1.797 8.064c2.38.384 4.203 2.451 4.203 4.936 0 .712-.155 1.386-.424 2h2.129c.19-.634.295-1.305.295-2 0-3.86-3.141-7-7.003-7-.546 0-1.105.063-1.673.195 1.571 4.472-.448 7.486-5.324 6.78-.002.707.104 1.385.294 2.025 5.548.444 7.918-2.92 7.503-6.936z";

const WEATHER_MOON_RISE = "M24 24h-24v-2h24v2zm-13-15h2v-5h3l-4-4-4 4h3v5zm1.797 4.064c2.38.384 4.203 2.451 4.203 4.936 0 .712-.155 1.386-.424 2h2.129c.19-.634.295-1.305.295-2 0-3.86-3.141-7-7.003-7-.546 0-1.105.063-1.673.195 1.571 4.472-.448 7.486-5.324 6.78-.002.707.104 1.385.294 2.025 5.548.444 7.918-2.92 7.503-6.936z";

const WEATHER_RAIN_THUNDERSTORM = "M6.406 17h3.594l-3.416 3h1.688l-6.272 4 2.542-3h-2.167l4.031-4zm14.016-9.484c-.178-3.232-3.031-5.777-6.432-5.491-1.087-1.24-2.693-2.025-4.49-2.025-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209.967 0 1.714.25 2.29.645-1.823.921-3.096 2.745-3.212 4.871-2.022.357-3.697 2.127-3.551 4.484zm14.618 2h-10.291c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.257-1.057 2.278-2.355 2.278zm-6.935 6.713l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.3 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29zm8.175-3.287l-1.41-1.41 2.303-2.303 1.41 1.41-2.303 2.303zm-3.301 3.287l-1.41-1.397 2.303-2.303 1.41 1.41-2.303 2.29z";

const WEATHER_LIGHTNING = "M13.802 13h3.042l-1.844 4h3l-6 7 2-5h-3l2.802-6zm6.62-5.484c-.178-3.232-3.031-5.777-6.432-5.491-1.087-1.24-2.693-2.025-4.49-2.025-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h1.381l.935-2h-2.316c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209 3.771 0 4.229 3.771 4.012 5.209 1.509-.105 3.488.437 3.488 2.513 0 1.257-1.057 2.278-2.355 2.278h-1.598l-.922 2h2.52c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-11.844 0c-2.022.357-3.697 2.127-3.551 4.484h-.673c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209.967 0 1.714.25 2.29.645-1.823.921-3.096 2.745-3.212 4.871z";

export class ICONS {
    static get POWER_BUTTON_SVG() { return POWER_BUTTON_SVG; }
    static get NETWORK_CONNECTION() { return NETWORK_CONNECTION; }
    static get NETWORK_CONNECTION_NEGATIVE() { return NETWORK_CONNECTION_NEGATIVE; }
    static get BATTERY_HALF() { return BATTERY_HALF; }
    static get BATTERY_FULL() { return BATTERY_FULL; }
    static get BATTERY_EMPTY() { return BATTERY_EMPTY; }
    static get BATTERY_ON_AC() { return BATTERY_ON_AC; }
    static get WEATHER_PARTLY_CLOUDY_DAY() { return WEATHER_PARTLY_CLOUDY_DAY; }
    static get WEATHER_CLEAR_DAY() { return WEATHER_CLEAR_DAY; }
    static get WEATHER_CLEAR_NIGHT() { return WEATHER_CLEAR_NIGHT; }
    static get WEATHER_CLEAR_MOON_NIGHT() { return WEATHER_CLEAR_MOON_NIGHT; }
    static get WEATHER_PARTLY_CLOUDY_NIGHT() { return WEATHER_PARTLY_CLOUDY_NIGHT; }
    static get WEATHER_RAIN() { return WEATHER_RAIN; }
    static get WEATHER_RAIN_HEAVY() { return WEATHER_RAIN_HEAVY; }
    static get WEATHER_RAIN_LIGHT() { return WEATHER_RAIN_LIGHT; }
    static get WEATHER_RAIN_CHANCE_DAY() { return WEATHER_RAIN_CHANCE_DAY; }
    static get WEATHER_RAIN_CHANCE_NIGHT() { return WEATHER_RAIN_CHANCE_NIGHT; }
    static get WEATHER_HEAT_WARNING() { return WEATHER_HEAT_WARNING; }
    static get WEATHER_SNOW() { return WEATHER_SNOW; }
    static get WEATHER_SNOW_HEAVY() { return WEATHER_SNOW_HEAVY; }
    static get WEATHER_SNOW_RAIN() { return WEATHER_SNOW_RAIN; }
    static get WEATHER_SNOW_CHANCE_DAY() { return WEATHER_SNOW_CHANCE_DAY; }
    static get WEATHER_SNOW_CHANCE_NIGHT() { return WEATHER_SNOW_CHANCE_NIGHT; }
    static get WEATHER_SNOW_BLOWING() { return WEATHER_SNOW_BLOWING; }
    static get WEATHER_HAIL() { return WEATHER_HAIL; }
    static get WEATHER_WIND() { return WEATHER_WIND; }
    static get WEATHER_WIND_BREEZY() { return WEATHER_WIND_BREEZY; }
    static get WEATHER_WIND_CLOUDY() { return WEATHER_WIND_CLOUDY; }
    static get WEATHER_SUN_SET() { return WEATHER_SUN_SET; }
    static get WEATHER_SUN_RISE() { return WEATHER_SUN_RISE; }
    static get WEATHER_MOON_SET() { return WEATHER_MOON_SET; }
    static get WEATHER_MOON_RISE() { return WEATHER_MOON_RISE; }
    static get WEATHER_RAIN_THUNDERSTORM() { return WEATHER_RAIN_THUNDERSTORM; }
    static get WEATHER_LIGHTNING() { return WEATHER_LIGHTNING; }
}


