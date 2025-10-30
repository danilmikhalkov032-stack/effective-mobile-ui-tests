from playwright.sync_api import Page

class BasePage:
    """Базовый класс для всех страниц"""
    
    def __init__(self, page: Page):
        self.page = page
        self.base_url = "https://effective-mobile.ru"
    
    def navigate(self):
        """Переход на главную страницу"""
        self.page.goto(self.base_url)
    
    def get_current_url(self):
        """Получить текущий URL"""
        return self.page.url
    
    def wait_for_page_load(self):
        """Ожидание загрузки страницы"""
        self.page.wait_for_load_state("networkidle")
    
    def take_screenshot(self, name):
        """Сделать скриншот"""
        self.page.screenshot(path=f"screenshots/{name}.png")
    
    def click_element(self, selector):
        """Клик по элементу с улучшенным ожиданием"""
        try:
            # Сначала ждем когда элемент станет доступен для клика
            self.page.wait_for_selector(selector, state="visible", timeout=15000)
            # Затем кликаем
            self.page.click(selector)
        except Exception as e:
            print(f"Ошибка при клике на элемент {selector}: {e}")
            # Делаем скриншот при ошибке
            self.take_screenshot(f"error_{selector}")
            raise
    
    def is_element_visible(self, selector):
        """Проверить видимость элемента"""
        return self.page.is_visible(selector)