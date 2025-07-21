import pandas as pd
import time

def calcular_precios_finales(df):
    """
    Calcula el precio final para cada venta aplicando descuentos e impuestos.
    Esta función es intencionalmente LENTA.
    """
    precios_finales = []
    
    # Diccionario de descuentos por categoría
    descuentos = {
        'Electrónica': 0.10,  # 10%
        'Ropa': 0.20,         # 20%
        'Hogar': 0.15,        # 15%
        'Alimentos': 0.05,    # 5%
        'Juguetes': 0.25      # 25%
    }
    
    # Impuesto general
    IMPUESTO = 0.19 # 19%

    # Iteracion fila por fila.
    for indice, fila in df.iterrows():
        # 1. Obtener los datos de la fila
        categoria = fila['categoria']
        cantidad = fila['cantidad']
        precio_unitario = fila['precio_unitario']
        
        # 2. Calcular el subtotal
        subtotal = cantidad * precio_unitario
        
        # 3. Aplicar descuento
        descuento_categoria = descuentos.get(categoria, 0)
        precio_con_descuento = subtotal * (1 - descuento_categoria)
        
        # 4. Aplicar impuesto
        precio_final = precio_con_descuento * (1 + IMPUESTO)
        
        # 5. Añadir a la lista
        precios_finales.append(precio_final)
        
    # Añadir la lista como una nueva columna en el DataFrame
    df['precio_final'] = precios_finales
    return df

# --- Script principal ---
if __name__ == "__main__":
    print("Iniciando procesamiento datos...")
    
    # Medir el tiempo de ejecución
    inicio = time.time()
    
    # Cargar los datos
    df = pd.read_csv('ventas.csv')
    
    # Procesar los datos con la función lenta
    df_resultado = calcular_precios_finales(df)
    
    fin = time.time()
    
    print(f"Tiempo total de ejecución: {fin - inicio:.4f} segundos.")
    print("\nPrimeros 5 registros procesados:")
    print(df_resultado.head())