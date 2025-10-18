const { useState, useEffect, useMemo } = React;

const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = "上海";

const WEATHER_CONDITIONS = [
  {
    codes: [0],
    label: "晴空万里",
    description: "晴朗无云，尽情享受阳光",
    icon: "☀️",
    theme: "clear-sky",
  },
  {
    codes: [1],
    label: "晴间多云",
    description: "以晴为主，偶有云朵飘过",
    icon: "🌤️",
    theme: "clear-sky",
  },
  {
    codes: [2],
    label: "局部多云",
    description: "云层渐厚，阳光在云中穿梭",
    icon: "⛅",
    theme: "cloudy",
  },
  {
    codes: [3],
    label: "阴天",
    description: "天空被云层覆盖，光线较弱",
    icon: "☁️",
    theme: "cloudy",
  },
  {
    codes: [45, 48],
    label: "雾天",
    description: "雾气弥漫，请注意安全出行",
    icon: "🌫️",
    theme: "foggy",
  },
  {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: "雨天",
    description: "雨水降临，别忘了携带雨具",
    icon: "🌧️",
    theme: "rainy",
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    label: "雪天",
    description: "雪花飘落，大地银装素裹",
    icon: "❄️",
    theme: "snowy",
  },
  {
    codes: [95, 96, 99],
    label: "雷暴",
    description: "雷鸣闪电，请尽量室内活动",
    icon: "⛈️",
    theme: "thunderstorm",
  },
];

const DEFAULT_CONDITION = {
  label: "多变天气",
  description: "天气变化莫测，请随时关注",
  icon: "🌈",
  theme: "clear-sky",
};

const getConditionFromCode = (code) => {
  if (typeof code !== "number") {
    return DEFAULT_CONDITION;
  }
  const match = WEATHER_CONDITIONS.find((condition) =>
    condition.codes.includes(code)
  );
  return match || DEFAULT_CONDITION;
};

const formatTemperature = (value) =>
  typeof value === "number" ? `${Math.round(value)}°C` : "--";

const formatSpeed = (value) =>
  typeof value === "number" ? `${Math.round(value)} km/h` : "--";

const formatHumidity = (value) =>
  typeof value === "number" ? `${Math.round(value)}%` : "--";

const formatDay = (dateString, index) => {
  if (!dateString) return "--";
  if (index === 0) return "今天";
  if (index === 1) return "明天";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  } catch (error) {
    return dateString.replace("T", " ");
  }
};

const formatUpdateTime = (dateString) => {
  if (!dateString) return "--";
  return dateString.replace("T", " ");
};

const WeatherVisual = ({ theme }) => {
  if (theme === "clear-sky") {
    return (
      <div className="weather-effect">
        <div className="sun" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
      </div>
    );
  }

  if (theme === "cloudy") {
    return (
      <div className="weather-effect">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>
    );
  }

  if (theme === "rainy") {
    const drops = Array.from({ length: 60 });
    return (
      <div className="weather-effect">
        {drops.map((_, index) => {
          const left = Math.random() * 100;
          const delay = Math.random() * -10;
          const duration = 0.8 + Math.random() * 0.7;
          return (
            <span
              key={index}
              className="rain-drop"
              style={{
                left: `${left}vw`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (theme === "snowy") {
    const flakes = Array.from({ length: 40 });
    const symbols = ["❄", "✼", "✻", "❅"];
    return (
      <div className="weather-effect">
        {flakes.map((_, index) => {
          const left = Math.random() * 100;
          const delay = Math.random() * -15;
          const duration = 5 + Math.random() * 8;
          const size = 16 + Math.random() * 18;
          const symbol = symbols[index % symbols.length];
          return (
            <span
              key={index}
              className="snow-flake"
              style={{
                left: `${left}vw`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                fontSize: `${size}px`,
              }}
            >
              {symbol}
            </span>
          );
        })}
      </div>
    );
  }

  if (theme === "thunderstorm") {
    const drops = Array.from({ length: 60 });
    return (
      <div className="weather-effect">
        <div className="lightning" />
        {drops.map((_, index) => {
          const left = Math.random() * 100;
          const delay = Math.random() * -10;
          const duration = 0.9 + Math.random() * 0.5;
          return (
            <span
              key={index}
              className="rain-drop"
              style={{
                left: `${left}vw`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (theme === "foggy") {
    return (
      <div className="weather-effect">
        <div className="fog-layer" />
      </div>
    );
  }

  return null;
};

const MetricCard = ({ icon, label, value }) => (
  <div className="detail-card">
    <div className="detail-icon">{icon}</div>
    <div className="detail-label">{label}</div>
    <div className="detail-value">{value}</div>
  </div>
);

const ForecastCard = ({ day, icon, description, max, min }) => (
  <div className="forecast-card">
    <div className="forecast-day">{day}</div>
    <div className="forecast-icon">{icon}</div>
    <div className="forecast-temp">
      <span className="temp-max">{max}</span>
      <span> / </span>
      <span className="temp-min">{min}</span>
    </div>
    <div className="forecast-desc">{description}</div>
  </div>
);

const LoadingState = () => (
  <div className="loading">
    <div className="loading-spinner" />
    <div className="loading-text">正在获取最新天气...</div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="error">
    <div className="error-title">查询失败</div>
    <div className="error-message">{message}</div>
  </div>
);

function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);

  const theme = useMemo(() => {
    if (!current) return DEFAULT_CONDITION.theme;
    const condition = getConditionFromCode(current.weather_code);
    return condition.theme;
  }, [current]);

  const condition = useMemo(() => {
    if (!current) return DEFAULT_CONDITION;
    return getConditionFromCode(current.weather_code);
  }, [current]);

  const forecastItems = useMemo(() => {
    if (!daily || !daily.time) return [];
    return daily.time.map((time, index) => {
      const weatherCode = daily.weather_code?.[index];
      const max = daily.temperature_2m_max?.[index];
      const min = daily.temperature_2m_min?.[index];
      const dayCondition = getConditionFromCode(weatherCode);
      return {
        id: `${time}-${index}`,
        day: formatDay(time, index),
        icon: dayCondition.icon,
        description: dayCondition.label,
        max: formatTemperature(max),
        min: formatTemperature(min),
      };
    });
  }, [daily]);

  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) {
      setError("请输入想要查询的城市或地区名称");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geoResponse = await fetch(
        `${GEO_API_URL}?name=${encodeURIComponent(cityName)}&count=1&language=zh&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("定位服务暂时不可用，请稍后再试");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("没有找到匹配的城市，请尝试其他名称或语言");
      }

      const place = geoData.results[0];

      const params = new URLSearchParams({
        latitude: place.latitude,
        longitude: place.longitude,
        current:
          "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,is_day",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: place.timezone || "auto",
        forecast_days: 5,
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
      });

      const weatherResponse = await fetch(`${WEATHER_API_URL}?${params.toString()}`);

      if (!weatherResponse.ok) {
        throw new Error("天气服务暂时不可用，请稍后再试");
      }

      const weatherData = await weatherResponse.json();

      if (!weatherData.current) {
        throw new Error("未能获取到该地区的天气数据");
      }

      setLocation(place);
      setCurrent(weatherData.current);
      setDaily(weatherData.daily || null);
    } catch (err) {
      console.error(err);
      setError(err.message || "获取天气信息失败，请稍后再试");
      setLocation(null);
      setCurrent(null);
      setDaily(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(query.trim());
  };

  const locationName = useMemo(() => {
    if (!location) return "";
    const parts = [location.name];
    if (location.admin1 && location.admin1 !== location.name) {
      parts.push(location.admin1);
    }
    if (location.country) {
      parts.push(location.country);
    }
    return parts.join(" · ");
  }, [location]);

  return (
    <div className="weather-app">
      <div className={`weather-background ${theme}`}>
        <WeatherVisual theme={theme} />
      </div>

      <header className="header">
        <h1>World Weather</h1>
        <p>查询全球任意城市，感受此刻的天气氛围</p>
      </header>

      <section className="search-container">
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="输入城市或地区名称，如：上海、Tokyo、Paris"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !query.trim()}
          >
            {loading ? "查询中..." : "查询天气"}
          </button>
        </form>
      </section>

      <main className="weather-content">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && current && (
          <div className="weather-info">
            <section className="main-weather">
              <div className="location">{locationName}</div>
              <div className="weather-main">
                <span className="weather-icon">{condition.icon}</span>
                <div className="temperature-section">
                  <div className="temperature">
                    {formatTemperature(current.temperature_2m)}
                  </div>
                  <div className="weather-description">{condition.label}</div>
                  <div className="feels-like">
                    体感温度 {formatTemperature(current.apparent_temperature)} · 更新时间 {" "}
                    {formatUpdateTime(current.time)}
                  </div>
                </div>
              </div>

              <div className="weather-details">
                <MetricCard
                  icon="💧"
                  label="相对湿度"
                  value={formatHumidity(current.relative_humidity_2m)}
                />
                <MetricCard
                  icon="🌬️"
                  label="风速"
                  value={formatSpeed(current.wind_speed_10m)}
                />
                <MetricCard
                  icon="📍"
                  label="经纬度"
                  value={
                    location
                      ? `${Number(location.latitude).toFixed(2)}°, ${Number(
                          location.longitude
                        ).toFixed(2)}°`
                      : "--"
                  }
                />
                <MetricCard
                  icon={current.is_day ? "🌞" : "🌙"}
                  label="昼夜"
                  value={current.is_day ? "白天" : "夜间"}
                />
              </div>
            </section>

            {forecastItems.length > 0 && (
              <section className="forecast-section">
                <div className="forecast-title">未来五日天气趋势</div>
                <div className="forecast-list">
                  {forecastItems.map((item) => (
                    <ForecastCard
                      key={item.id}
                      day={item.day}
                      icon={item.icon}
                      description={item.description}
                      max={item.max}
                      min={item.min}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <footer>
        数据来源：<a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · 免费天气 API
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
