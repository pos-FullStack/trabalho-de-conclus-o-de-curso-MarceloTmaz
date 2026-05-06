function removerCombustivel(button) {
    const item = button.closest(".combustivel-item");
    if (item) {
        item.remove();
    }
}