from .base_page import BasePage

class MainPage(BasePage):
    """Page Object для главной страницы effective-mobile.ru"""
    
    # Уточненные локаторы - используем href атрибуты которые мы увидели в отладке
    ABOUT_LINK = "a[href='#about']"
    SERVICES_LINK = "a[href='#moreinfo']"
    PROJECTS_LINK = "a[href='#cases']" 
    REVIEWS_LINK = "a[href='#Reviews']"
    CONTACTS_LINK = "a[href='#contacts']"
    
    # Альтернативные локаторы по тексту в квадратных скобках (более стабильные)
    ABOUT_LINK_TEXT = "text=[ О нас ]"
    SERVICES_LINK_TEXT = "text=[ Услуги ]"
    PROJECTS_LINK_TEXT = "text=[ Проекты ]"
    CONTACTS_LINK_TEXT = "text=[ Контакты ]"
    REVIEWS_LINK_TEXT = "text=[ Отзывы ]"
    
    def click_about_us(self):
        """Клик на ссылку 'О нас'"""
        try:
            self.click_element(self.ABOUT_LINK_TEXT)
        except:
            self.click_element(self.ABOUT_LINK)
        self.wait_for_page_load()
        return self.get_current_url()
    
    def click_services(self):
        """Клик на ссылку 'Услуги'"""
        try:
            self.click_element(self.SERVICES_LINK_TEXT)
        except:
            self.click_element(self.SERVICES_LINK)
        self.wait_for_page_load()
        return self.get_current_url()
    
    def click_projects(self):
        """Клик на ссылку 'Проекты'"""
        try:
            self.click_element(self.PROJECTS_LINK_TEXT)
        except:
            self.click_element(self.PROJECTS_LINK)
        self.wait_for_page_load()
        return self.get_current_url()
    
    def click_reviews(self):
        """Клик на ссылку 'Отзывы'"""
        try:
            self.click_element(self.REVIEWS_LINK_TEXT)
        except:
            self.click_element(self.REVIEWS_LINK)
        self.wait_for_page_load()
        return self.get_current_url()
    
    def click_contacts(self):
        """Клик на ссылку 'Контакты'"""
        try:
            self.click_element(self.CONTACTS_LINK_TEXT)
        except:
            self.click_element(self.CONTACTS_LINK)
        self.wait_for_page_load()
        return self.get_current_url()
    
    def get_page_title(self):
        """Получить заголовок страницы"""
        return self.page.title()