function vibrateSafe(durationMs) {
  // Проверяем, поддерживает ли браузер вибрацию
  if ("vibrate" in navigator) {
    try {
      // Запускаем вибрацию (можно передать число или массив паттернов)
      const success = navigator.vibrate(durationMs);
      if (!success) {
        console.warn("Вибрация не сработала (возможно, запрещено настройками)");
      }
    } catch (error) {
      console.error("Ошибка при вызове вибрации:", error);
    }
  } else {
    console.warn("Браузер не поддерживает API вибрации");
  }
}

/**
 * Запускает вибрацию в зависимости от уровня интенсивности (1-8+)
 * @param {number} intensity - Уровень интенсивности (от 1 до 8+)
 */
function vibrateByIntensity(intensity) {
  // Проверяем поддержку вибрации
  if (!("vibrate" in navigator)) {
    console.warn("Ваш браузер/устройство не поддерживает вибрацию");
    return;
  }

  // Нормализуем значение (минимум 1, максимум — без ограничений)
  const clampedIntensity = Math.max(1, Math.min(intensity, 8));

  // Паттерны вибрации для разных уровней
  const patterns = {
    1: [50], // 50мс (очень коротко)
    2: [100], // 100мс
    3: [150], // 150мс
    4: [200], // 200мс
    5: [100, 50, 100], // Двойной импульс
    6: [150, 50, 150], // Более заметный двойной импульс
    7: [200, 50, 200], // Сильная прерывистая вибрация
    8: [300], // Длительная (но не раздражающая)
    9: [200, 30, 200, 30, 200], // Многократная (для 8+)
  };

  // Выбираем паттерн (если >8, используем самый интенсивный)
  const pattern = patterns[clampedIntensity] || patterns[9];

  // Запускаем вибрацию
  navigator.vibrate(pattern);
}

export {vibrateByIntensity, vibrateSafe};
