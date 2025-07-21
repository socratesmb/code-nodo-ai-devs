import pandas as pd
import numpy as np

# Número de registros a generar
num_registros = 1000000

# Datos de ejemplo
data = {
    'id_producto': np.arange(1, num_registros + 1),
    'categoria': np.random.choice(
        ['Electrónica', 'Ropa', 'Hogar', 'Alimentos', 'Juguetes'],
        size=num_registros
    ),
    'cantidad': np.random.randint(1, 10, size=num_registros),
    'precio_unitario': np.round(np.random.uniform(5.0, 500.0, size=num_registros), 2)
}

# Crear el DataFrame
df_ventas = pd.DataFrame(data)

# Guardar en un archivo CSV
df_ventas.to_csv('ventas.csv', index=False)

print(f"✅ Archivo 'ventas.csv' con {num_registros} registros creado exitosamente.")