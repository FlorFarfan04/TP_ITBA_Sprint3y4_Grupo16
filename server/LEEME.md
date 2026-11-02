# Práctica: desarrollo con agente guiado por especificaciones

1. Copien `AGENTS.md` en la raíz de su backend (al lado de index.js),
   `docs/spec-categorias.md` y `tests/contrato.test.js` a su backend.
2. En package.json, scripts: `"test": "node --test tests/contrato.test.js"`.
3. Con el servidor prendido, `npm test`: arranca 0 de 8. Es lo esperado.
4. Revisen y corrijan AGENTS.md (líneas ✏️) para que describa SU proyecto.
5. Pídanle al agente UNA fase por vez de docs/spec-categorias.md. Después de cada fase:
   lean el diff, corran `npm test` y anoten qué hizo fuera de la spec.
