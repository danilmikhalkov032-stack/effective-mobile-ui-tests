import allure
import pytest

@allure.epic("Главная страница effective-mobile.ru")
@allure.feature("Проверка навигации по разделам")
class TestMainPageNavigation:
    
    @allure.story("Проверка загрузки главной страницы")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_page_loads(self, main_page):
        """Тест что страница загружается"""
        with allure.step("Проверить что страница загрузилась"):
            current_url = main_page.get_current_url()
            page_title = main_page.get_page_title()
            assert "effective-mobile" in current_url
            main_page.take_screenshot("main_page_loaded")
            print(f"Заголовок страницы: {page_title}")
            print(f"URL страницы: {current_url}")
    
    @allure.story("Переход в раздел 'О нас'")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_navigate_to_about_us(self, main_page):
        """Тест перехода в раздел 'О нас'"""
        
        with allure.step("Кликнуть на ссылку 'О нас'"):
            current_url = main_page.click_about_us()
        
        with allure.step("Проверить, что URL содержит 'about'"):
            assert "#about" in current_url, f"URL {current_url} не содержит '#about'"
        
        with allure.step("Сделать скриншот страницы"):
            main_page.take_screenshot("about_us_page")
    
    @allure.story("Переход в раздел 'Услуги'")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_navigate_to_services(self, main_page):
        """Тест перехода в раздел 'Услуги'"""
        
        with allure.step("Кликнуть на ссылку 'Услуги'"):
            current_url = main_page.click_services()
        
        with allure.step("Проверить, что URL содержит 'moreinfo'"):
            assert "#moreinfo" in current_url, f"URL {current_url} не содержит '#moreinfo'"
        
        with allure.step("Сделать скриншот страницы"):
            main_page.take_screenshot("services_page")
    
    @allure.story("Переход в раздел 'Проекты'")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_navigate_to_projects(self, main_page):
        """Тест перехода в раздел 'Проекты'"""
        
        with allure.step("Кликнуть на ссылку 'Проекты'"):
            current_url = main_page.click_projects()
        
        with allure.step("Проверить, что URL содержит 'cases'"):
            assert "#cases" in current_url, f"URL {current_url} не содержит '#cases'"
        
        with allure.step("Сделать скриншот страницы"):
            main_page.take_screenshot("projects_page")
    
    @allure.story("Переход в раздел 'Контакты'")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_navigate_to_contacts(self, main_page):
        """Тест перехода в раздел 'Контакты'"""
        
        with allure.step("Кликнуть на ссылку 'Контакты'"):
            current_url = main_page.click_contacts()
        
        with allure.step("Проверить, что URL содержит 'contacts'"):
            assert "#contacts" in current_url, f"URL {current_url} не содержит '#contacts'"
        
        with allure.step("Сделать скриншот страницы"):
            main_page.take_screenshot("contacts_page")