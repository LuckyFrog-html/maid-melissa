const smoothScroll = (selector: string, offset?: number) => {
    const element = document.querySelector(selector);

    if (!element) return;
    const y: number =
        element.getBoundingClientRect().top +
        window.scrollY +
        (offset ? offset : 0);

    window.scrollTo({ top: y, behavior: "smooth" });
};

export default smoothScroll;
