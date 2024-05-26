FROM python:3.12.3-slim AS build

# test
WORKDIR /app
COPY requirements.txt /app/
ENV PATH="/home/app/.local/bin:${PATH}"
RUN python -m venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN rm -rf requirements.txt

FROM python:3.12.3-slim

WORKDIR /app
COPY /app /app/
COPY --from=build --chown=app:app /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "main:app"]