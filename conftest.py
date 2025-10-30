import pytest
from playwright.sync_api import sync_playwright
from pages.main_page import MainPage

@pytest.fixture(scope="session")
def browser():
    """Фикстура для браузера"""
    with sync_playwright() as p:
        # Запуск браузера (headless=False для видимого режима)
        browser = p.chromium.launch(headless=False)
        yield browser
        browser.close()

@pytest.fixture(scope="function")
def page(browser):
    """Фикстура для страницы"""
    page = browser.new_page()
    # Установка таймаута
    page.set_default_timeout(30000)
    yield page
    page.close()

@pytest.fixture(scope="function")
def main_page(page):
    """Фикстура для главной страницы"""
    main_page = MainPage(page)
    main_page.navigate()
    main_page.wait_for_page_load()
    return main_page