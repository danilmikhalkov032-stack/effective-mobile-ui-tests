import allure
import pytest

@allure.epic("Отладочные тесты")
class TestDebug:
    
    def test_find_all_links(self, main_page):
        """Поиск всех ссылок на странице для отладки"""
        print("\n=== ПОИСК ВСЕХ ССЫЛОК НА СТРАНИЦЕ ===")
        
        # Ищем все ссылки
        all_links = main_page.page.query_selector_all("a")
        print(f"Всего найдено ссылок: {len(all_links)}")
        
        # Выводим текст и href первых 20 ссылок
        for i, link in enumerate(all_links[:20]):
            text = link.text_content().strip() if link.text_content() else "БЕЗ ТЕКСТА"
            href = link.get_attribute("href") or "БЕЗ HREF"
            print(f"{i+1}. Текст: '{text}' -> HREF: {href}")
        
        # Ищем конкретно элементы с текстом "Услуги" и "Контакты"
        print("\n=== ПОИСК КОНКРЕТНЫХ ЭЛЕМЕНТОВ ===")
        
        services_elements = main_page.page.query_selector_all("text=Услуги")
        contacts_elements = main_page.page.query_selector_all("text=Контакты")
        
        print(f"Найдено элементов 'Услуги': {len(services_elements)}")
        print(f"Найдено элементов 'Контакты': {len(contacts_elements)}")
        
        for i, elem in enumerate(services_elements):
            print(f"Элемент 'Услуги' {i+1}: {elem.text_content()}")
            
        for i, elem in enumerate(contacts_elements):
            print(f"Элемент 'Контакты' {i+1}: {elem.text_content()}")
        
        # Делаем скриншот для анализа
        main_page.take_screenshot("debug_page")
        
        assert len(all_links) > 0, "Не найдено ни одной ссылки"